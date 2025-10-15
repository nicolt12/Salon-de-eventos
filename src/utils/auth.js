import { jwtDecode } from "jwt-decode";

// 🔑 Obtener token desde localStorage o sessionStorage
export const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

// 🚪 Logout: limpia todo el storage
export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

// 👤 Obtener rol del usuario
export const getRol = () =>
  localStorage.getItem("rol") || sessionStorage.getItem("rol");

// ⏳ Validar si el token sigue siendo válido
export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    const ahora = Date.now() / 1000;
    return decoded.exp && decoded.exp > ahora;
  } catch {
    return false;
  }
};

// 🧑‍💻 Obtener nombre del usuario (si lo guardaste en storage)
export const getNombre = () =>
  localStorage.getItem("nombre") || sessionStorage.getItem("nombre");