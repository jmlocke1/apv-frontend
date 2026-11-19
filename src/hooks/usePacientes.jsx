import { useContext, createContext } from "react";

export const PacientesContext = createContext();

const usePacientes = () => {
    const context = useContext(PacientesContext);
    if (!context) {
        throw new Error('usePacientes debe usarse dentro de un PacientesProvider');
    }
    return context;
}

export default usePacientes;