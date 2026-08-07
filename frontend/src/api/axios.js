import axios from 'axios';

const api = axios.create({
  baseURL: 'https://employee-management-system-cvdl.onrender.com/api',
});

export default api;