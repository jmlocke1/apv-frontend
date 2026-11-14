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
                console.log('Data autenticar:', data);
                if(!data) {
                    console.log('Borrando token...');
                    localStorage.removeItem('token');
                    setAuth({});
                } else {
                    setAuth(data);
                }
                
            } catch (error) {
                console.log('Error en data',error.response?.data);
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
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios('/veterinarios/cerrar-sesion');
        } catch (error) {
            console.log(error.response.data.msg);
        }
        localStorage.removeItem('token');
        setAuth({});
    }

    const actualizarPerfil = async (datos) => {
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
            const url = `/veterinarios/perfil/${datos._id}`;
            const { data } = await clienteAxios.put(url, datos);
            setAuth(data);
            return {
                msg: 'Almacenado Correctamente',
                error: false
            }
        } catch (error) {
            console.log(error.response);
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