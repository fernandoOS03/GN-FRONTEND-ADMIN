import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        //Esto se asegura que siempre enviamos datos en formatos json
        'Content-type': 'application/json',
    },
}
);

//Esto intercepta peticioneA, Ademas de que se ejecuta antes de que cualquier peticion sea enviada al servidor
axiosInstance.interceptors.request.use((config) => {

    //Este lo que hace es obtener el token que fue creado durante el login
    const token = localStorage.getItem('token');

    //Si el token existe, lo adjuntamos
    if (token) {
        //Establece el header <authorization> con el formato bearer
        //Esto es lo que espera el middleware 'protect' en mi backend
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
}
);

export default axiosInstance;