import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = (prop) => {
    const {children} = prop
    const [cargando, setCargando] = useState(true);
    const [ auth, setAuth ] = useState({});

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
        console.log(datos);
        const token = localStorage.getItem('token');
        if(!token) {
            setCargando(false);
            return;
        }
        
        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            const { data } = await clienteAxios.put(url, datos);
            console.log('Datos que llegan:', data);
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

    return (
        <AuthContext.Provider 
            value={{
                auth, 
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil
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