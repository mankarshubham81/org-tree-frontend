import axios from 'axios';

const API_BASE = 'http://localhost:4000/api/employees';

export const fetchTree = () => axios.get(`${API_BASE}/tree`);
export const addEmployee = formData =>
  axios.post(`${API_BASE}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
