import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //importante para quando fizer deploy
});

export default api;