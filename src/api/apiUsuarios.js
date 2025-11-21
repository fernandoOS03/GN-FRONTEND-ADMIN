/**
 * Este archivo se encargarade las llamadas HTTP a mi back (/api/usuarios) usando axiosInstance
 */

import axiosInstance from "./axiosInstance.js";

const API_ENDPOINT = '/usuarios';

export const getAllUsers = async () => {
    const res = await axiosInstance.get(API_ENDPOINT);
    return res.data; //Asumen que el backend esta devolviendo { success: true, data: [...] 
};

export const createUser = async (userData) => {
    const res = await axiosInstance.post(API_ENDPOINT, userData);
    return res.data;
};

export const updateUser = async (userId,userData) => {
    const res = await axiosInstance.put(`${API_ENDPOINT}/${userId}`, userData);
    return res.data;
};

export const deleteUser = async (userId) => {
    const res = await axiosInstance.delete(`${API_ENDPOINT}/${userId}`);
    return res.data;
};

export const getUserById = async (userId) => {
    const res = await axiosInstance.delete(`${API_ENDPOINT}/${userId}`);
    return res.data;
}