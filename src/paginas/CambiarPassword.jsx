import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import { setAlertaTime, trimObjeto } from "../helpers/functionsHelpers.js";
import useAuth from "../hooks/useAuth.jsx";

const CambiarPassword = () => {
    const { guardarPassword } = useAuth();
    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        passwordActual: '',
        nuevoPassword: '',
        repetirPassword: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordLimpio = trimObjeto(password);
        setPassword(passwordLimpio)
        if(Object.values(passwordLimpio).some(campo => campo === '')) {
            setAlertaTime({
                msg: 'Todos los campos son obligatorios',
                error: true
            }, setAlerta);
            return;
        }
        if(passwordLimpio.nuevoPassword !== passwordLimpio.repetirPassword) {
            setAlertaTime({
                msg: 'Los password nuevos no son iguales',
                error: true
            }, setAlerta);
            return;
        }
        if(passwordLimpio.nuevoPassword.length < 6) {
            setAlertaTime({
                msg: 'El password debe tener mínimo 6 caracteres',
                error: true
            }, setAlerta);
            return;
        }
        guardarPassword(passwordLimpio);
    }

    

    const { msg } = alerta
    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>

            <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Password aquí</span></p>

            <div className="flex justify-center">
                <div className="w-full lg:w-2/3 xl:w-1/2  bg-white shadow rounded-lg p-5">
                    {msg && <Alerta alerta={alerta} />}
                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label htmlFor="passwordActual" className="uppercase font-bold text-gray-600">Password Actual</label>
                            <input 
                                type="password" 
                                name="passwordActual" 
                                id="passwordActual" 
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                placeholder="Escribe tu password actual"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                                
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="nuevoPassword" className="uppercase font-bold text-gray-600">Nuevo Password</label>
                            <input 
                                type="password" 
                                name="nuevoPassword" 
                                id="nuevoPassword" 
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                placeholder="Escribe tu nuevo password"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="repetirPassword" className="uppercase font-bold text-gray-600">Repite tu Nuevo Password</label>
                            <input 
                                type="password" 
                                name="repetirPassword" 
                                id="repetirPassword" 
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                placeholder="Escribe tu nuevo password"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        
                        <input 
                            type="submit" 
                            value="Actualizar Password" 
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default CambiarPassword