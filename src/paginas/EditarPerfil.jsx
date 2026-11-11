import AdminNav from "../components/AdminNav"

const EditarPerfil = () => {
    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>

            <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Información aquí</span></p>

            <div className="flex justify-center">
                <div className="w-full lg:w-2/3 xl:w-1/2  bg-white shadow rounded-lg p-5">
                    <form action="">
                        <div className="my-3">
                            <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nombre</label>
                            <input 
                                type="text" 
                                name="nombre" 
                                id="nombre" 
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" 
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="web" className="uppercase font-bold text-gray-600">Sitio Web</label>
                            <input 
                                type="text" 
                                name="web" 
                                id="web" 
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" 
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="telefono" className="uppercase font-bold text-gray-600">Teléfono</label>
                            <input 
                                type="text" 
                                name="telefono" 
                                id="telefono" 
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" 
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" 
                            />
                        </div>
                        <input 
                            type="submit" 
                            value="Guardar Cambios" 
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPerfil