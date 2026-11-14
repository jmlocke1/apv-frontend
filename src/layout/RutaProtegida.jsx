import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import { PacientesProvider } from "../context/PacientesProvider";

const RutaProtegida = () => {
    const { auth, cargando } = useAuth();
    //console.log('Cargando:', cargando, 'Auth:', auth, 'token:', localStorage.getItem('token'));
    if(cargando) return 'Cargando...'
    return (
        <>
            <PacientesProvider>
                <Header />

                { auth?._id ? (
                    <main className="container mx-auto mt-10">
                        <Outlet />
                    </main>
                ) : <Navigate to="/" /> }

                <Footer />
            </PacientesProvider>
        </>
    )
}

export default RutaProtegida