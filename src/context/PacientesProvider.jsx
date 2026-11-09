import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import { setAlertaTime } from "../helpers/functionsHelpers";

const PacientesContext = createContext();

const PacientesProvider = ({children}) => {
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if(paciente.id) {
            // Editando un paciente
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                
                const pacientesActualizados = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState );
                setPacientes(pacientesActualizados);
                return { msg: 'Paciente actualizado correctamente' };
            } catch (error) {
                return {
                    msg: error.response.data.msg,
                    error: true
                }
            }
        } else {
            // Paciente nuevo
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config);
                const { createdAt, updateAt, __v, ...pacienteAlmacenado } = data;

                setPacientes([pacienteAlmacenado, ...pacientes]);
                return {msg: "Paciente guardado correctamente"}
            } catch (error) {
                return {
                    msg: error.response.data.msg,
                    error: true
                }
            }
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente);
        setMostrarFormulario(true);
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                mostrarFormulario,
                setMostrarFormulario
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