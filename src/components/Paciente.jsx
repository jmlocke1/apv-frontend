import { formatearFecha } from "../helpers/functionsHelpers";

const Paciente = ({paciente}) => {
    const { email, fecha_alta, nombre, propietario, sintomas, _id } =paciente;
    
  return (
    <>
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold uppercase text-indigo-800 my-5">Nombre: {' '}
                <span className="font-normal normal-case text-black">{nombre}</span>
            </p>
            <p className="font-bold uppercase text-indigo-800 my-5">Propietario: {' '}
                <span className="font-normal normal-case text-black">{propietario}</span>
            </p>
            <p className="font-bold uppercase text-indigo-800 my-5">Email contacto: {' '}
                <span className="font-normal normal-case text-black">{email}</span>
            </p>
            <p className="font-bold uppercase text-indigo-800 my-5">Fecha de Alta: {' '}
                <span className="font-normal normal-case text-black">{formatearFecha(fecha_alta)}</span>
            </p>
            <p className="font-bold uppercase text-indigo-800 my-5">Síntomas: {' '}
                <span className="font-normal normal-case text-black">{sintomas}</span>
            </p>

            <div className="flex justify-around my-5">
                <button 
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
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