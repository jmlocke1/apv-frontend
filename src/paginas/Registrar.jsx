import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { quitaBlancosArray } from "../helpers/functionsHelpers.js";
import Alerta from "../components/Alerta";
import config from "../config/config.js";

const Registrar = () => {
    const [ nombre, setNombre ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')
    const [ alerta, setAlertaState ] = useState({})

    const limpiaFormulario = () => {
        setNombre('');
        setEmail('');
        setPassword('');
        setRepetirPassword('');
    }

    function setAlerta(alerta) {
        setAlertaState(alerta);
        setTimeout(() => {
            setAlertaState({})
        }, 3000);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const arrayAValidar = quitaBlancosArray([nombre, email, password, repetirPassword])
        
        if( arrayAValidar.includes('')) {
            setAlerta({ msg: 'Hay campos vacíos', error: true });
            return;
        }
        
        if(password !== repetirPassword) {
            setAlerta({ msg: 'Los Password no son iguales', error: true });
            return;
        }

        if(password.length < 6) {
            setAlerta({ msg: 'El Password es muy corto. Debe ser, al menos de 6 caracteres', error: true });
            return;
        }
        
        setAlerta({});

        // Crear el usuario en la api
        try {
            const url = `${config.apiDomain}/api/veterinarios`;
            const respuesta = await axios.post(url, { nombre, email, password, repetirPassword });
            setAlerta({
                msg: "Creado correctamente, revisa tu email",
                error: false
            });
            // limpiaFormulario();
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alerta

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-5xl text-center">
                    Crea tu Cuenta y Administra <span className="text-black">Tus Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg hover:shadow-2xl px-5 py-10 rounded-xl bg-white">
                { msg && <Alerta 
                    alerta={alerta}
                />}
                <form 
                    action=""
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label 
                            htmlFor=""
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Nombre
                        </label>
                        <input 
                            type="text" 
                            name="" 
                            id="" 
                            placeholder="Tu Nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange={ e => setNombre(e.target.value) }
                        />
                    </div>
                    <div className="my-5">
                        <label 
                            htmlFor="email"
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Email
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Email de Registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={ e => setEmail(e.target.value) }
                        />
                    </div>

                    <div className="my-5">
                        <label 
                            htmlFor="password"
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Password

                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={ e => setPassword(e.target.value) }
                        />
                    </div>

                    <div className="my-5">
                        <label 
                            htmlFor="repassword"
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Repetir Password

                        </label>
                        <input 
                            type="password" 
                            name="repassword" 
                            id="repassword" 
                            placeholder="Repite tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repetirPassword}
                            onChange={ e => setRepetirPassword(e.target.value) }
                        />
                    </div>
                    
                    <input 
                        type="submit" 
                        value="Crear Cuenta" 
                        className="bg-indigo-700 w-full py-3 px-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link 
                        className="block text-center my-5 text-gray-500"
                        to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
                    <Link 
                        className="block text-center my-5 text-gray-500"
                        to="/olvide-password">Olvidé mi Password</Link>
                </nav>
            </div>
        </>
    )
}

export default Registrar