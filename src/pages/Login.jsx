import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const res = await fetch(`${API_URL}/api/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json(); // 👈 solo una vez

    if (!res.ok) {
      console.error("❌ Error en login:", data);
      alert(data.error || "Credenciales inválidas");
      return;
    }

    console.log("✅ Login exitoso:", data);

    if (data.token && data.rol === "admin") {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("token", data.token);
      storage.setItem("rol", data.rol);
      storage.setItem("nombre", data.nombre); 
      if (data.token && data.rol === "admin") {
  console.log("📦 Guardando en localStorage...");
  console.log("Token:", data.token);
  console.log("Rol:", data.rol);
  console.log("Nombre:", data.nombre);

  localStorage.setItem("token", data.token);
  localStorage.setItem("rol", data.rol);
  localStorage.setItem("nombre", data.nombre);

  console.log("✅ Guardado completo");
  navigate("/admin");
}
      navigate("/admin");
    } else {
      alert("Credenciales inválidas");
    }
  } catch (err) {
    console.error("❌ Error de conexión:", err);
    alert("Error de conexión con el servidor");
  }
};

  return (
    <div className="page-wrapper login-page">
      <div className="login-container">
        <h2>Acceso administrador</h2>

        <form onSubmit={handleLogin}>
          <div className="password-field">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
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

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;