import axios from "axios";

// Configuración de Axios
const api = axios.create({
  baseURL: "http://localhost:5000", // URL del backend
  withCredentials: true, // Si necesitas enviar cookies o encabezados de autenticación
});

export default api;
