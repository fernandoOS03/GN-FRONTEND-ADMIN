import React from 'react';

const ROLES = ['super_admin', 'admin', 'editor'];

export const UserForm = ({ formData, setFormData, onSubmit, loading, isEditing, formError }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDniChange = (e) => {
        //Simple validación para asegurar que solo enten numer en el DNI
        const value = e.target.value.replace(/\D/g, '');
        setFormData(prev => ({ ...prev, dni: value }));
    };

    return (
        <div>
            <h2>{isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>

            {
                formError && (
                    <div>{formError}</div>
                )
            }

            <form onSubmit={onSubmit}>
                {/*Nombres y apellidos*/}
                <div>
                    <div>
                        <label>Nombres</label>
                        <input type="text"
                            name="nombres"
                            value={formData.nombres || ''}
                            onChange={handleChange}
                            required
                            disabled={loading} />
                    </div>

                    <div>
                        <label>Apellidos</label>
                        <input type="text"
                            name="apellidos"
                            value={formData.apellidos || ''}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>
                </div>

                {/*Email y dni */}
                <div>
                    <div>
                        <label> Email</label>
                        <input type="email"
                            name='email'
                            value={formData.email || ''}
                            onChange={handleChange}
                            required
                            disabled={loading || isEditing}  // No se permite eidtar el email
                        />
                    </div>

                    <div>
                        <label> DNI</label>
                        <input type="text"
                            name='dni'
                            value={formData.dni || ''}
                            onChange={handleDniChange}
                            maxLength={8}
                            required
                            disabled={loading || isEditing}
                        />
                    </div>
                </div>

                {/*contraseña y rol */}
                <div>
                    <div>
                        <label> Contraseña {isEditing ? '(Nueva)' : ''}</label>
                        <input type="password"
                            name='contrasenia'
                            value={formData.contrasenia || ''}
                            onChange={handleChange}
                            required={!isEditing}
                            disabled={loading}  // No se permite eidtar el email
                        />
                        {isEditing && <p>Dejar vacia la contrasenia para mantener la actual</p>}
                    </div>


                    <div>
                        <label> Rol</label>
                        <select type="text"
                            name='rol'
                            value={formData.rol || ''}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        >
                            <option value="">Seleccione un Rol</option>
                            {
                                ROLES.map(role => (
                                    <option key={role} value={role} > {role.toUpperCase()}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>


                <div>
                    <button type='submit'
                        disabled={loading}
                    >
                        {loading ? 'Procesando...' : (isEditing ? 'Guardar Cambios' : 'Crear Usuario')}
                    </button>
                </div>
            </form >
        </div>
    );
};
