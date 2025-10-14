import { Navigate } from 'react-router-dom'

function PrivateRoute({ children, requireAdmin = false }) {
  const isAuthenticated =
    localStorage.getItem('auth') === 'true' ||
    sessionStorage.getItem('auth') === 'true'

  const isAdmin =
    localStorage.getItem('role') === 'admin' ||
    sessionStorage.getItem('role') === 'admin'

  //  Si requiere admin y no lo es, redirige
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/login" />
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute