import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
import { setAlertaTime } from "../helpers/functionsHelpers";

const PacientesContext = createContext();

const PacientesProvider = ({children}) => {
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const { auth } = useAuth();

    useEffect(() => {
        const obtenerPacientes = async () => {
            const token = localStorage.getItem('token');
            if(!token) return;
            try {
                const { data } = await clienteAxios('/pacientes');
                setPacientes(data);
            } catch (error) {
                console.error(error.response?.data?.msg);
            }
        }
        obtenerPacientes();
    }, [auth]);

    const guardarPaciente = async (paciente) => {
        if(paciente.id) {
            // Editando un paciente
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente);
                
                const pacientesActualizados = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState );
                setPacientes(pacientesActualizados);
                return { msg: 'Paciente actualizado correctamente' };
            } catch (error) {
                return {
                    msg: error.response?.data || 'Hubo un error al actualizar el paciente',
                    error: true
                }
            }
        } else {
            // Paciente nuevo
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente);
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

                setPacientes([pacienteAlmacenado, ...pacientes]);
                return {msg: "Paciente guardado correctamente"}
            } catch (error) {
                return {
                    msg: error.response?.data?.msg || 'Hubo un error al guardar el paciente',
                    error: true
                }
            }
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente);
        setMostrarFormulario(true);
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Confirmas que deseas eliminar?');
        if(confirmar) {
            try {
                await clienteAxios.delete(`/pacientes/${id}`);
                const pacientesActualizados = pacientes.filter( pacienteState => pacienteState._id !== id );
                setPacientes(pacientesActualizados);
                return { msg: 'Paciente eliminado correctamente' };
            } catch (error) {
                return {
                    msg: error.response?.data?.msg || 'Hubo un error al eliminar el paciente',
                    error: true
                }
            }
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                mostrarFormulario,
                setMostrarFormulario,
                eliminarPaciente
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