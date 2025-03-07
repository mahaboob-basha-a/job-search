import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, 
});

// Signup API Call
export const signup = async (userData) => {
    try {
        const response = await api.post('/user/signUp', userData);
        return response.data;
    } catch (error) {
        console.error('Signup Error:', error.response?.data.message || error.message);
        throw error;
    }
};

// Login API Call
export const login = async (credentials) => {
    try {
        const response = await api.post('/user/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Login Error:', error.response?.data.message || error.message);
        throw error;
    }
};

// Logout API
export const logout = async () => {

     try {
        const response = await api.post('/user/logout');
        return response.data;
    } catch (error) {
        console.error('Logout Error:', error.response?.data.message || error.message);
        throw error;
    }
};

// Get Profile API
export const getProfile = async () => {
    try {
        const response = await api.get('/user/profile');
        return response.data;
    } catch (error) {
        console.error('profile Error:', error.response?.data.message || error.message);
        throw error;
    }
};

// Get All Jobs API Call
export const getAllJobs = async () => {
    try {
        const response = await api.get('/job/all-jobs');
        return response.data;
    } catch (error) {
        console.error('Get Jobs Error:', error.response?.data || error.message);
        throw error;
    }
};

export default api;
