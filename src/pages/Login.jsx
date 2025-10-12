import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

function Login() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (password === 'admin123') {
      if (remember) {
        localStorage.setItem('auth', 'true')
      } else {
        sessionStorage.setItem('auth', 'true')
      }
      navigate('/admin')
    } else {
      alert('Contraseña incorrecta')
    }
  }

  return (
    <div className="page-wrapper login-page">
      <div className="login-container">
        <h2>Acceso administrador</h2>

        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
  type="button"
  className="toggle-visibility"
  onClick={() => setShowPassword(!showPassword)}
  aria-label="Mostrar u ocultar contraseña"
>
  {showPassword ? <FaEyeSlash /> : <FaEye />}
</button>
        </div>

        <label className="remember-label">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          Mantener sesión iniciada
        </label>

        <button onClick={handleLogin}>Ingresar</button>
      </div>
    </div>
  )
}

export default Login