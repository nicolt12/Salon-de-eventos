import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { getToken, logout } from "../utils/auth";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Verificar si hay sesión activa
  const isAuthenticated = getToken();

  const handleLogout = () => {
    logout(); // usa tu helper centralizado
    navigate("/login");
  };

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

        <li>
          <Link to="/admin" onClick={() => setMenuOpen(false)} className="admin-link">
            <span className="admin-text">Admin</span>
          </Link>
        </li>

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