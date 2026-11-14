import axios from "axios";
import { useNavigate } from "react-router-dom";
import conf from "./config";



const clienteAxios = axios.create({
    baseURL: `${conf.apiDomain}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 1. Interceptor de Petición: Adjunta el token en cada llamada
clienteAxios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// 2. Interceptor de Respuesta: Detecta el 401
clienteAxios.interceptors.response.use(
    response => response,
    error => {
        if(error.response) {
            const { status, data } = error.response;

            // Manejo de errores 401 (Autenticación)
            if(status === 401) {
                localStorage.removeItem('token');
                if (data.codigo === 'TOKEN_EXPIRADO') {
                    console.warn('Sesión caducada:', data.msg);
                } 
                if(data.codigo === 'TOKEN_INVALIDO') {
                    console.error('Intento de acceso con token corrupto:', data.msg);
                }
                if(data.codigo === 'PASSWORD_INCORRECTO') {
                    console.error('Password incorrecto:', data.msg);
                }

                if(window.location.pathname !== '/') {
                    window.location.href = '/';
                }
            }

            // Manejo de error 403 (Autorización para una tarea)
            if(status === 403) {
                console.error('Acceso prohibido:', data.msg);

            }
        }

        return Promise.reject(error);
    }
);

export default clienteAxios;