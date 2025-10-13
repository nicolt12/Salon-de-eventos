import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Cierra el menú al cambiar de ruta
  useEffect(() => {
    const handleRouteChange = () => setMenuOpen(false);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <h2 className="logo">Salón Familiar</h2>

      <div ref={menuRef} className="menu-container">
        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>
          <li><Link to="/galeria" onClick={() => setMenuOpen(false)}>Galería</Link></li>
          <li><Link to="/reserva" onClick={() => setMenuOpen(false)}>Reserva</Link></li>
          <li><Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link></li>
          <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;