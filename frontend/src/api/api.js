import axios from "axios";

// Configuración de Axios
const api = axios.create({
  baseURL: "https://kitchen-backend-7efv.onrender.com", // URL del backend
  withCredentials: true, // Si necesitas enviar cookies o encabezados de autenticación
});

export default api;
