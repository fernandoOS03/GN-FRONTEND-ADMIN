// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/useAuth.jsx';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const { login, loading, error } = useAuth(); 
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [contrasenia, setContrasenia] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const success = await login(email, contrasenia);

        if (success) {
            navigate('/dashboard', { replace: true }); 
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Acceso Administrador</h2>

                {error && (
                    <div>
                        <span>{error}</span>
                    </div>
                )}

                <div>
                    <label htmlFor="email">
                        Correo Electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="ejemplo@dominio.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
            </form>
        </div>
    );
};
