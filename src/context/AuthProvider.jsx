import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = (prop) => {
    const {children} = prop
    const [cargando, setCargando] = useState(true);
    const [ auth, setAuth ] = useState({});
    const [alerta, setAlerta] = useState({});

    function setAlertaTime(alerta, setAlertaState = setAlerta, time = 3000) {
        setAlertaState(alerta);
        setTimeout(() => {
            setAlertaState({})
        }, time);
}

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if(!token) {
                setCargando(false);
                return;
            }
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/veterinarios/perfil');
                if(!data) {
                    localStorage.removeItem('token');
                    setAuth({});
                } else {
                    setAuth(data);
                }
                
            } catch (error) {
                setAuth({})
            }
            setCargando(false)
        }
        return () => autenticarUsuario();
    }, []);

    const cerrarSesion = async () => {
        const token = localStorage.getItem('token');
        if(!token) {
            setCargando(false);
            return;
        }
        
        try {
            const { data } = await clienteAxios('/veterinarios/cerrar-sesion');
        } catch (error) {
            console.log(error.response.data.msg);
        }
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setAuth({});
    }

    const actualizarPerfil = async (datos) => {
        
        const token = localStorage.getItem('token');
        if(!token) {
            setCargando(false);
            return;
        }
        
        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            const { data } = await clienteAxios.put(url, datos);
            setAuth(data);
            return {
                msg: 'Almacenado Correctamente',
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async (datos) => {
        try {
            const url = '/veterinarios/actualizar-password';
            const { data, request } = await clienteAxios.put(url, datos);
            
            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider 
            value={{
                auth, 
                setAuth,
                alerta,
                setAlerta,
                setAlertaTime,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider,
    AuthContext
}

// export default AuthContext;