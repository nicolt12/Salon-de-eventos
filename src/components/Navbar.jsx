import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    navigate("/login");
  };

  // ✅ Verificar si hay sesión activa
  const isAuthenticated =
    localStorage.getItem("auth") === "true" ||
    sessionStorage.getItem("auth") === "true";

  return (
    <nav className="navbar">
      <h2 className="logo">Salón Familiar</h2>

      {/* Botón hamburguesa */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>
        <li><Link to="/galeria" onClick={() => setMenuOpen(false)}>Galería</Link></li>
        <li><Link to="/reserva" onClick={() => setMenuOpen(false)}>Reserva</Link></li>
        <li><Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link></li>
        <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link></li>

        {/* ✅ Mostrar solo si está logueado */}
        {isAuthenticated && (
          <li>
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="logout-btn"
            >
              Cerrar sesión
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
