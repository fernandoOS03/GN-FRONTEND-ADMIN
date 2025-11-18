import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { AppRouter } from './routes/AppRouter.jsx'; 
import { AuthProvider } from './context/AuthContext.jsx'; 
import './index.css'; 

// El código se monta aquí
createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* AuthProvider envuelve todo para dar acceso al contexto */}
        <AuthProvider> 
            {/* AppRouter maneja la navegación (incluyendo /login) */}
            <AppRouter />
        </AuthProvider>
    </React.StrictMode>
);