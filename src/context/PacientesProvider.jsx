import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext();

const PacientesProvider = ({children}) => {
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        const obtenerPacientes = async () => {

            try {
                const token = localStorage.getItem('token');
                if(!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config);
                setPacientes(data);
            } catch (error) {
                console.error(error);
            }
        }
        obtenerPacientes();
    }, []);

    const guardarPaciente = async (paciente) => {
        
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/pacientes', paciente, config);
            const { createdAt, updateAt, __v, ...pacienteAlmacenado } = data;

            setPacientes([pacienteAlmacenado, ...pacientes]);
            return {msg: "Paciente guardado correctamente"}
        } catch (error) {
            console.log("Estamos en el error del try", error.response.data.msg);
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export {
    PacientesContext,
    PacientesProvider
}