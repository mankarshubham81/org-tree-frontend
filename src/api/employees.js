import axios from 'axios';

// const VITE_API_BASE = `${import.meta.env.VITE_API_BASE}/api/employees`;

export const fetchTree = () => axios.get(`${import.meta.env.VITE_API_BASE}/tree`);
export const addEmployee = formData =>
  axios.post(`${import.meta.env.VITE_API_BASE}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
