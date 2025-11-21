import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Hook para navegación suave
import axios from "axios"; // Solo para el objeto global (aunque se usa axiosInstance)
import axiosInstance from "../api/axiosInstance.js"; // Instancia configurada con Interceptor

// 1. CREACIÓN DEL CONTEXTO
export const AuthContext = createContext({
    // Valores por defecto que definen el "contrato" de la data
    token: null,
    user: null, // Objeto con detalles del usuario (nombre, id)
    rol: null,
    loading: false,
    error: null,
    login: async () => { },
    logout: () => { },
});

// 2. COMPONENTE PROVEEDOR (PROVIDER)
export const AuthProvider = ({ children }) => {
    // Hook para la navegación suave (redirigir después de login/logout)
    const navigate = useNavigate(); 
    
    // --- A. ESTADO DE AUTENTICACIÓN (Persistencia y Datos del Usuario) ---
    // Carga inicial: Si hay token o rol en localStorage, los carga al inicio
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [rol, setRol] = useState(localStorage.getItem('rol') || null);
    
    // Estado para el objeto de usuario (nombre, id, etc.)
    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem('user');
        // Si hay datos, los parsea, si no, es null
        return userData ? JSON.parse(userData) : null; 
    }); 

    // --- B. ESTADO DE PROCESO (Feedback a la UI) ---
    const [loading, setLoading] = useState(false); // Indica si está esperando respuesta de la API
    const [error, setError] = useState(null); // Almacena mensajes de error del login


    // --- C. FUNCIONES DE AUTENTICACIÓN ---

    /**
     * Función que maneja el inicio de sesión.
     */
    const login = async (email, contrasenia) => {
        setLoading(true);
        setError(null);
        try {
            // RUTA RELATIVA: AxiosInstance ya maneja la base URL (ej: http://localhost:3000/api)
            const url = `/auth/login`; 

            // Usa axiosInstance para la petición. Asume que el backend devuelve { token, rol, user }
            const response = await axiosInstance.post(url, { email, contrasenia });
            
            // Desestructuración de la respuesta del backend
            const { token: newToken, rol: userRol, user: userData } = response.data; 

            // 1. Guardar en local Storage para persistencia
            localStorage.setItem('token', newToken);
            localStorage.setItem('rol', userRol);
            localStorage.setItem('user', JSON.stringify(userData));
            
            // 2. Actualizar estados de React
            setToken(newToken);
            setRol(userRol);
            setUser(userData); 

            setLoading(false);
            return true; // Éxito

        } catch (err) {
            console.error("Error en el login:", err.response?.data?.message || err.message);
            
            // 3. Limpiar estado en caso de fallo
            localStorage.removeItem('token');
            localStorage.removeItem('rol');
            localStorage.removeItem('user');
            setToken(null);
            setRol(null);
            setUser(null);
            
            // Mostrar error al usuario
            setError(err.response?.data?.message || 'Error de conexión o credenciales inválidas.');
            setLoading(false);
            return false;
        }
    };


    /**
     * Función que maneja el cierre de sesion.
     */
    const logout = () => {
        // Limpiar estados y localStorage
        setToken(null);
        setRol(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('user');
        
        // Usar useNavigate para una navegación suave (SPA)
        navigate('/login', { replace: true }); 
    };

    // --- D. OBJETO DE CONTEXTO ---
    // Objeto que se proveerá a los componentes hijos
    const contextValue = {
        token,
        rol,
        user, 
        loading,
        error,
        login, // Función de login expuesta
        logout // Función de logout expuesta
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};