import usePacientes from "../hooks/usePacientes";

const ListadoPacientes = () => {
    const { pacientes } = usePacientes();
    console.log(pacientes);
    return (
        <>
            { pacientes.length ? (
                <>
                    <h2 className="font-black text-3xl tex-center">Listado de Pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus <span className="text-indigo-600 fond-bolt">Pacientes y Citas</span>
                    </p>
                </>
            ) : 
            (
                <>
                    <h2 className="font-black text-3xl tex-center">No hay pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando pacientes <span className="text-indigo-600 fond-bolt">y aparecerán en este lugar</span>
                    </p>
                </>
            ) }
        </>
    )
}

export default ListadoPacientes