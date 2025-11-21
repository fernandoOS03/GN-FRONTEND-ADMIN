import React from "react";

export const UsersTable = ({ users, onEdit, onRemove, rol }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        {rol === 'super_admin' && (
                            <th>Acciones</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td> {user.nombres} {user.apellidos}</td>
                            <td>{user.email}</td>
                            <td>
                                <span>{user.rol}</span>
                            </td>
                            {rol === 'super_admin' && (
                                <td>
                                    <button onClick={() => onEdit(user.id)} title="Editar">Editar</button>
                                    <button onClick={() => onRemove(user.id)} title="Eliminar">Eliminar</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};