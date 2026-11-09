import { useState, useEffect } from "react";
import { setAlertaTime, quitaBlancosArray } from "../helpers/functionsHelpers.js";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";


const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState(new Date().toISOString());
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);
    const [alerta, setAlerta] = useState({});

    const { guardarPaciente, paciente, setMostrarFormulario } = usePacientes();
    
    useEffect(() => {
        if(paciente.nombre) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(new Date(paciente.fecha_alta).toLocaleDateString('en-CA'));
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente]);
    
    const limpiaFormulario = () => {
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha(new Date().toISOString());
        setSintomas('');
    }

    const handleSubmit = async e => {
        e.preventDefault();

        // Validar el formulario
        if (quitaBlancosArray([nombre, propietario, email, fecha, sintomas]).includes('')) {
            setAlertaTime({
                msg: "Todos los campos son obligatorios",
                error: true
            }, setAlerta);
            return;
        }

        const msg = await guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });
       
        setAlertaTime( msg, setAlerta );
        limpiaFormulario();
        setMostrarFormulario(false);
    }

    const { msg } = alerta;
    return (
        <>
            <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

            <p className="text-xl mt-5 mb-10 text-center">
                Añade tus pacientes y <span className="text-indigo-600 fond-bold">Adminístralos</span>
            </p>
            
            
            <form
                className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-lg rounded-md hover:shadow-xl"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold"
                    >Nombre Mascota</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="text-gray-700 uppercase font-bold"
                    >Nombre Propietario</label>
                    <input
                        type="text"
                        id="propietario"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="text-gray-700 uppercase font-bold"
                    >Email Propietario</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="fecha"
                        className="text-gray-700 uppercase font-bold"
                    >Fecha Alta</label>
                    <input
                        type="date"
                        id="fecha"
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="text-gray-700 uppercase font-bold"
                    >Síntomas</label>
                    <textarea
                        id="sintomas"
                        placeholder="Describe los síntomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={ id ? "Guardar Cambios" : "Agregar Paciente"}
                />
            </form>
            {msg && <Alerta alerta={alerta} />}
        </>
    )
}

export default Formulario;