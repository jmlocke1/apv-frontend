import { useContext, createContext } from "react";

export const AuthContext = createContext();

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
}

export default useAuth;