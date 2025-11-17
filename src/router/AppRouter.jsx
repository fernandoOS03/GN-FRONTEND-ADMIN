// src/routes/AppRouter.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LoginPage } from '../pages/LoginPage.jsx';
// Crea un archivo simple para evitar errores de compilación
//import { NotFoundPage } from '../pages/NotFoundPage.jsx'; 

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/" element={<LoginPage />} index />
                <Route path="/login" element={<LoginPage />} />

                {/* Si no lo encuentras, salta a 404 */}
               {/*<Route path="*" element={<NotFoundPage />} />*/}
            </Routes>
        </BrowserRouter>
    );
};