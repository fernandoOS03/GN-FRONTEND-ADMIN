import { createContext, useState } from "react";

import axiosInstance from "../api/axiosInstance.js";

//Primero creamos el contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //Estado inicial, intenta cargar desde localStorage
    const [isLogginIn, setIsLogginIn] = useState(!!localStorage.getItem('token'));
    const [rol, setRol] = useState(localStorage.getItem('rol') || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //Funcion del login (Esta es llamada desde LoginPage.jsx)
    const login = async (email, contrasenia) => {
        setLoading(true);
        setError(null);
        try {
            //llamamos al endoint del backend
            const response = await axiosInstance.post('auth/login', {
                email, contrasenia
            });

            const {token, rol} = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('rol', rol);

            //Actualizamos el estado general de react
            setIsLogginIn(true);
            setRol(rol);
            setLoading(false);
            return true; //Esto retorna exito en el login

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Error de conexion o credenciales';
            setError(errorMessage);
            setLoading(false);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        setIsLogginIn(false);
        setRol(null);
    };

    //Valor del contexto que se alimentara la app

    const contextValue = {
        isLogginIn,
        rol,
        loading,
        error,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
