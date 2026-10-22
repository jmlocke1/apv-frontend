import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            
            <div>
                <h1 className="text-indigo-600 font-black text-5xl text-center">
                    Inicia Sesión y Administra tus <span className="text-black">Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg hover:shadow-2xl px-5 py-10 rounded-xl bg-white">
                <form action="">
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
                        />
                    </div>
                    <input 
                        type="submit" 
                        value="Iniciar Sesión" 
                        className="bg-indigo-700 w-full py-3 px-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link 
                        className="block text-center my-5 text-gray-500"
                        to="/registrar">¿No tienes una cuenta? ¡Regístrate!</Link>
                    <Link 
                        className="block text-center my-5 text-gray-500"
                        to="/olvide-password">Olvidé mi Password</Link>
                </nav>
            </div>
            
            
        </>
    )
}

export default Login;