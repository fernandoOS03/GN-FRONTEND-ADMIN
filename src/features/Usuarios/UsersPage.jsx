import React from "react";
import { useUsuarios } from "./hooks/useUsuarios.js";
import { Users, Trash2, Edit, PlusCircle } from 'lucide-react';
import { UsersTable } from "./components/UsersTable.jsx";

export const UsersPage = () => {
    const { users, loading, error, removeUser, rol,  } = useUsuarios();

    if (loading) return <div>Cargando Usuarios...</div>;
    if (error) return <div> Error : {error}</div>

    const handleCreate = () => {
        //  usar useNavigate() aquí para la navegación real
        alert("Navegar a la página de creación de usuario.");
    };

    const handleEdit = (id) => {
        alert(`Navegar a la edicion con del usuario con ID : ${id}`);
    };

    return (
        <div>
            <div>
                <h1>Gestión de Usuarios</h1>
                {rol === 'super_admin' && (
                    <button onClick={handleCreate}> Nuevo Usuario </button>
                )}
            </div>

            <UsersTable
                users={users}
                onEdit={handleEdit}
                onRemove={removeUser}
                rol={rol} />

            {
                users.length === 0 && !loading && (
                    <div> No hay usuarios registrados </div>
                )
            }
        </div>
    )
}