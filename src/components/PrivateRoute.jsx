import { Navigate } from "react-router-dom";

function PrivateRoute({ children, requireAdmin = false }) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const rol =
    localStorage.getItem("rol") || sessionStorage.getItem("rol");

  const isAuthenticated = !!token;
  const isAdmin = rol === "admin";

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;