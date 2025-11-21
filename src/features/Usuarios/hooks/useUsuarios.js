/**
 * Este hook maneja:
 * El estado local (loading y users), 
 * Las llamadas a la API 
 * Manejo de errores para el modulo del usuario.
 */

import { useState, useEffect,  } from "react";
import { getAllUsers, deleteUser, createUser } from "../../../api/apiUsuarios.js";
import { useAuth } from "../../../context/useAuth.jsx";

export const useUsuarios = () => {
    //Estados donde se almacenan los usuarios
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { rol } = useAuth(); // Obtenemos el rol para la logica condicional

    // Función principal para cargar la lista de usuarios
    const getUsers = async () => {
        setLoading(true);
        setError(null);

        try {
            //el interceptor de Axios adjunta el token jwt
            const response = await getAllUsers();

            //revisar si la data viene en responde.data
            setUsers(response.data || response)

        } catch (error) {
            console.error("Error listar usuarios : ", error),
                setError("No se pudieron cargar los usuarios, revisa tu token y la conexión");
        } finally {
            setLoading(false);
        }

    };
    //Efecto para cargar los usuarios al inicio del componente
    useEffect(() => {
        getUsers();
    }, []);


    // const createUser = async (userData) => {
    //     try {
    //         const response = await createUsuario(userData);
    //         return response
    //     } catch (error) {
    //         console.error("Erro al crear el usuario : ", error);
    //         setError("No se puede crear el usuario.")
    //     }
    // };
    const updateUser = async (userId, userData) => {
        try {
            const response = await updateUser(userId, userData);
            return response;
        } catch (error) {
            console.error("Error al editar usuario : ", error);
            setError("No se puede editar el usuario")
        }
    };


    //Función para eliminar usuarios
    const removeUser = async (userId) => {
        //Simple verificación de seguridad en el front-end (RBAC)
        if (rol != 'super_admin' || !window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
            return;
        }

        try {
            await deleteUser(userId);
            //acutalizamos la lista local, esto despues de la eliminación
            setUsers(users.filter(userId.id != userId))
        } catch (error) {
            console.error("Errir al eliminar el usurio : ", error);
            setError("No se pudo eliminar este usuario")
        }
    };

    //retornamos el estado y las funciones que la ui necesitara
    //ademas exportamos el rol para filtrar por botones en la ui (rbac)
    return { users, loading, error, getUsers, updateUser, createUser, removeUser, rol };

};
