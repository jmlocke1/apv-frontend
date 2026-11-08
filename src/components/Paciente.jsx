import usePacientes from "../hooks/usePacientes";
import { formatearFecha } from "../helpers/functionsHelpers";


const Paciente = ({ paciente }) => {
    const { setEdicion } = usePacientes();
    const { email, fecha_alta, nombre, propietario, sintomas, _id } = paciente;

    return (
        <>
            <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
                <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                    <p className="font-bold uppercase text-indigo-800">Nombre: {' '}
                        <span className="font-normal normal-case text-black">{nombre}</span>
                    </p>
                    <p className="font-bold uppercase text-indigo-800">Propietario: {' '}
                        <span className="font-normal normal-case text-black">{propietario}</span>
                    </p>
                </div>
                <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 my-5">
                    <p className="font-bold uppercase text-indigo-800">Email contacto: {' '}
                        <span className="font-normal normal-case text-black">{email}</span>
                    </p>
                    <p className="font-bold uppercase text-indigo-800 ">Fecha de Alta: {' '}
                        <span className="font-normal normal-case text-black">{formatearFecha(fecha_alta)}</span>
                    </p>
                </div>
                <p className="font-bold uppercase text-indigo-800 my-5">Síntomas: {' '}
                    <span className="font-normal normal-case text-black">{sintomas}</span>
                </p>

                <div className="flex justify-around my-5">
                    <button
                        type="button"
                        className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
                        onClick={() => setEdicion(paciente)}
                    >Editar</button>
                    <button
                        type="button"
                        className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
                    >Eliminar</button>
                </div>
            </div>
        </>
    )
}

export default Paciente