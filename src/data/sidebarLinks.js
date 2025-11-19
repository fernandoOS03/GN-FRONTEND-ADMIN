import { Calendar, FileText, Home, LogOut, MapPin, Star, Users } from "lucide-react";

export const sidebarLinks = [
    //---------------------------------------
    // Sección Principal
    //---------------------------------------
    {
        name: 'Dashboard',
        icon: Home,
        path: '/',
        roles: ['super_admin', 'admin', 'editor'],
    },

    //---------------------------------------
    // Sección Administración de contenido
    //---------------------------------------
    {
        name: 'Noticias',
        icon: FileText,
        path: '/noticias',
        roles: ['super_admin', 'admin', 'editor'],
    },

    {
        name: 'Eventos',
        icon: Calendar,
        path: '/eventos',
        roles: ['super_admin', 'admin'],
    },

    {
        name: 'Testimmonios',
        icon: Star,
        path: '/testimonios',
        roles: ['super_admin', 'admin', 'editor'],
    },

    //---------------------------------------
    // Sección de configuración del sistema
    //---------------------------------------
    {
        name: 'Usuarios y Roles',
        icon: Users,
        path: '/sedes',
        roles: ['super_admin'],
    },

    {
        name: 'Sedes',
        icon: MapPin,
        path: '/sedes',
        roles: ['super_admin', 'admin'],
    }
];

//Enlace de cerrar sesion, siempre visible para todos 
export const logoutLink = {
    name: 'Cerrar sesion',
    icon: LogOut,
    action: 'logout'
};
