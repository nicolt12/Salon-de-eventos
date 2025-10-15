import { Navigate } from "react-router-dom";
import { getToken, getRol } from "../utils/auth";

function PrivateRoute({ children, requireAdmin = false }) {
  const isAuthenticated = !!getToken();
  const isAdmin = getRol() === "admin";

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
