import React from "react";
import { Navigate, Outlet } from "react-router-dom";
//Navigete : Para redirigir al usuario si no tiene acceso
//Outlet : Necesario para acceder a rutas anidadas 
import { useAuth } from "../context/useAuth";

/**
 * Este componenete realiza dos validaciones, el de autenticacion y autorización(Tiene el rol correcto)
 * @Param {Array<string>} allWeRoles - lista de roles permitidos para la ruta actual
 * *Si esta vacio, solo requiere estar logueado
 */
export const ProtectRoute = ({ allowedRoles = [] }) => {
    //1. OBTENCIÓN DE DATOS DEL USUARIO
    const { token, rol } = useAuth();

    //convertimos el rol a miniscula para una comparacion de strings consistente
    const userRole = rol?.toLowerCase();

    //2.VERIFICACION DE AUTENTICACIÓM
    //si no existe el token, el usuario no esta logueado
    if (!token) {
        //Regidirigmos al usuario a la página del login
        //el atributo replace asegura que el usuario no vuelva a la página restringida
        return <Navigate to="/login" replace />;
    }

    //3. VERIFICACIÓN DE AUTENTICACIÓN (RBAC)
    /**
     * Logica para determinar si el usuario actual esta permitido en esta ruta
     * 
     * Se considera autorizado si la lista de roles esta vacia (solo se requiere el login) o el rol del usuario esta incluido en la lista de allwedRoles
     */
    const isAuthorized = allowedRoles.length === 0 || allowedRoles.includes(userRole);
    if (isAuthorized) {
        //Si el usuario esta logeado y tiene el rol permitido.
        //Se renderiza las rutas hijas (los componentes de la pagina real: /usuario, /noticias, etc)
        return <Outlet />;
    } else {
        //4. ACCESO DENEGADO
        //Si el usario esta logeado pero no tiene el rol necesario
        console.warn(`ACCESO DENEGADO:'${rol} 'intentó acceder a una ruta restringida`)
    }
    //Redirigimos a una ruta segura (podria ser el dashboard princial)
    //Cambiar cuando este en producción: se puede considerar cambiar a un página de error 403 especfica
    return <Navigate to="/" replace />;

};
