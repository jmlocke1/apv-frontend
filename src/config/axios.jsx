import axios from "axios";
import { useNavigate } from "react-router-dom";
import conf from "./config";

const clienteAxios = axios.create({
    baseURL: `${conf.apiDomain}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Variables para controlar múltiples peticiones simultáneas mientras se renueva el token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};


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
    async error => {
        const originalRequest = error.config;

        if(error.response) {
            const { status, data } = error.response;

            if(status === 401 && data.codigo === 'TOKEN_EXPIRADO' && !originalRequest._retry) {
                if(isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                        .then(nuevoToken => {
                            originalRequest.headers.Authorization = `Bearer ${nuevoToken}`;
                            return clienteAxios(originalRequest);
                        })
                        .catch(err => Promise.reject(err));
                }
                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    if(!refreshToken) throw new Error('No hay refresh token');

                    // Usamos axios puro para no pasar por este mismo interceptor
                    const res = await axios.post(
                        `${conf.apiDomain}/api/veterinarios/refresh-token`,
                        { refreshToken },
                        { headers: { 'Content-Type': 'application/json' } }
                    );

                    const nuevoToken = res.data.token;
                    localStorage.setItem('token', nuevoToken);

                    // Reanudamos las peticiones que estaban en cola y la petición actual
                    processQueue(null, nuevoToken);
                    originalRequest.headers.Authorization = `Bearer ${nuevoToken}`;
                    return clienteAxios(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    // Si el refreshToken también caducó, cerramos sesión
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken')
                    if(window.location.pathname !== '/') {
                        window.location.href = '/';
                    }
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            // Cualquier otro 401 (TOKEN_INVALIDO, TOKEN_NO_ENVIADO, etc.) -> Cerrar sesión directo
            if (status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken')
                if (window.location.pathname !== '/') {
                    window.location.href = '/';
                }
            }

            if(status === 403) {
                console.error('Acceso prohibido:', data.msg);
            }
        }

        return Promise.reject(error);
    }
);

export default clienteAxios;