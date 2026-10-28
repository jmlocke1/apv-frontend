import { useState, useEffect, createContext } from "react";


const AuthContext = createContext();

const AuthProvider = (prop) => {
    const {children} = prop
    const [ auth, setAuth ] = useState({});
    return (
        <AuthContext.Provider 
            value={{
                auth, 
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;