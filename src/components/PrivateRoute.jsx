import { Navigate } from "react-router-dom";
import { getToken, getRol, isTokenValid } from "../utils/auth";

function PrivateRoute({ children, requireAdmin = false }) {
  const isAuthenticated = !!getToken();
  const isAdmin = getRol() === "admin";

  // 🔒 Si el token no es válido, redirige al login
  if (!isTokenValid()) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 Si requiere admin y no lo es, redirige
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Si está autenticado, renderiza el contenido
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;