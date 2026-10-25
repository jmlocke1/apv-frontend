import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";
import config from "../config/config";



const ConfirmarCuenta = () => {
    const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false);
    const [ cargando, setCargando ] = useState(true);
    const [ alerta, setAlerta ] = useState({});
    const params = useParams();
    const { token } = params;

    
    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `${config.apiDomain}/api/veterinarios/confirmar/${token}`;
                const { data } = await axios.get(url);

                setCuentaConfirmada(true);
                setAlerta({
                    msg: data.msg
                })
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }
            setCargando(false);
        }
        return () => confirmarCuenta();
    }, []);

    const { msg } = alerta;
    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-5xl text-center">
                    Confirma tu Cuenta y comienza a administrar <span className="text-black">tus Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg hover:shadow-2xl px-5 py-10 rounded-xl bg-white">
                { msg && <Alerta 
                    alerta={alerta}
                />}

                { cuentaConfirmada && (
                    <Link 
                        className="block text-center my-5 text-gray-500"
                        to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
                )}
            </div>
        </>
    )
}

export default ConfirmarCuenta