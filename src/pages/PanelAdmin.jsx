import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./PanelAdmin.css";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetricCard from "../components/MetricCard";
import BarChartReservas from "../components/BarChartReservas";
import PieChartHorarios from "../components/PieChartHorarios";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL || "/api";

function PanelAdmin() {
  const navigate = useNavigate();
  const [turnos, setTurnos] = useState([]);
  const [ultimaCantidad, setUltimaCantidad] = useState(0);
  const [adminNombre, setAdminNombre] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [tiempoSesion, setTiempoSesion] = useState(null);
  const isFirstLoad = useRef(true);

  // 🔒 Protección de acceso y expiración de sesión
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const rol = localStorage.getItem("rol") || sessionStorage.getItem("rol");
    const nombreGuardado = localStorage.getItem("nombre") || sessionStorage.getItem("nombre");

    if (!token || rol !== "admin") {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const ahora = Date.now() / 1000;

      if (decoded.exp && decoded.exp < ahora) {
        toast.warn("Sesión expirada. Iniciá sesión nuevamente.");
        handleLogout();
      } else {
        setAdminNombre(decoded.nombre || nombreGuardado || "Admin");
        const minutosRestantes = Math.floor((decoded.exp - ahora) / 60);
        setTiempoSesion(minutosRestantes);
      }
    } catch (err) {
      console.error("❌ Token inválido:", err);
      toast.error("Sesión inválida. Iniciá sesión nuevamente.");
      handleLogout();
    }
  }, [navigate]);

  // 🔄 Fetch de turnos con token y notificación
  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        const res = await fetch(`${API_URL}/api/reservas/admin`, {
  headers: { Authorization: `Bearer ${token}` },
});

        if (!res.ok) throw new Error("Acceso no autorizado");

        const data = await res.json();
        const visitas = data.filter((r) => r.nombre);
        const nuevas = visitas.length - ultimaCantidad;

        if (!isFirstLoad.current && nuevas > 0) {
          toast(`📥 ${nuevas} nueva${nuevas > 1 ? "s" : ""} reserva${nuevas > 1 ? "s" : ""}`, {
            position: "bottom-right",
            className: "toast-nueva-reserva",
            bodyClassName: "toast-body",
            hideProgressBar: true,
            autoClose: 4000,
            closeButton: false,
          });
        }

        setTurnos(visitas);
        setUltimaCantidad(visitas.length);
        isFirstLoad.current = false;
      } catch (err) {
        console.error("Error al obtener turnos:", err);
        toast.error("Error al obtener turnos");
      }
    };

    fetchTurnos();
    const interval = setInterval(fetchTurnos, 10000);
    return () => clearInterval(interval);
  }, [ultimaCantidad]);

  // 🗑️ Eliminar turno individual
  const eliminarTurno = async (id) => {
    if (!window.confirm("¿Eliminar este turno de visita?")) return;

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/reservas/${id}`, {
  method: "DELETE",
  headers: { Authorization: `Bearer ${token}` },
});

      if (!res.ok) throw new Error("No autorizado");

      setTurnos(turnos.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error al eliminar:", err);
      toast.error("No se pudo eliminar el turno.");
    }
  };

  // 🧹 Eliminar turnos anteriores a hoy
  const limpiarTurnosAntiguos = async () => {
    const hoy = new Date().toISOString().split("T")[0];
    const antiguos = turnos.filter((r) => r.fecha < hoy);

    if (antiguos.length === 0) {
      toast.info("No hay turnos antiguos para eliminar.");
      return;
    }

    if (!window.confirm(`¿Eliminar ${antiguos.length} turno${antiguos.length > 1 ? "s" : ""} anterior${antiguos.length > 1 ? "es" : ""}?`)) return;

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      for (const r of antiguos) {
        await fetch(`${API_URL}/api/reservas/${r._id}`, {
  method: "DELETE",
  headers: { Authorization: `Bearer ${token}` },
});
      }

      const actualizados = turnos.filter((r) => r.fecha >= hoy);
      setTurnos(actualizados);
      setUltimaCantidad(actualizados.length);

      toast.success("Turnos antiguos eliminados.");
    } catch (err) {
      console.error("Error al limpiar turnos:", err);
      toast.error("No se pudieron eliminar los turnos antiguos.");
    }
  };

  // 🔚 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("nombre");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rol");
    sessionStorage.removeItem("nombre");

    toast.info("Sesión cerrada correctamente", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
    });

    navigate("/login");
  };

  // 📊 Métricas
  const hoy = new Date().toISOString().split("T")[0];
  const reservasHoy = turnos.filter((r) => r.fecha === hoy);
  const futuras = turnos.filter((r) => new Date(r.fecha) > new Date());

  // 🖥️ Render
  return (
    <div className="reservas-wrapper">
<div className="panel-header">
  <h2>Panel Admin</h2>
  <div className="admin-bloque-derecha">
    <div className="admin-linea">
      <span className="admin-saludo">👋 Bienvenido, {adminNombre}</span>
      <button
        onClick={handleLogout}
        className="logout-btn"
        title="Cerrar sesión"
        aria-label="Cerrar sesión"
      >
        🔓 Cerrar sesión
      </button>
    </div>
    {tiempoSesion !== null && (
      <p className="tiempo-sesion">
        ⏳ Sesión activa por {tiempoSesion} minuto{tiempoSesion !== 1 ? "s" : ""} más
      </p>
    )}
  </div>
</div>
    <div className="encabezado-turnos">

  <div className="filtros-turnos">
    <input
      type="text"
      placeholder="Buscar por nombre"
      onChange={(e) => setFiltroNombre(e.target.value.toLowerCase())}
    />
    <input
      type="date"
      onChange={(e) => setFiltroFecha(e.target.value)}
    />
  </div>
</div>
  
      {turnos.length === 0 ? (
        <p>No hay turnos registrados.</p>
      ) : (
        <div className="tabla-scroll">
          <table className="reservas-table" aria-label="Tabla de turnos de visita">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Comentarios</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {turnos
                .filter((r) => {
                  const nombreNormalizado = r.nombre
                    ?.toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");

                  const filtroNormalizado = filtroNombre
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");

                  return (
                    nombreNormalizado?.includes(filtroNormalizado) &&
                    (filtroFecha === "" || r.fecha === filtroFecha)
                  );
                })
                .map((r) => (
                  <tr key={r._id}>
  <td>{r.nombre || "—"}</td>
  <td>{r.email || "—"}</td>
  <td>{r.fecha || "—"}</td>
  <td>{r.horario || "—"}</td>
  <td>{r.mensaje || "—"}</td>
  <td>
    <button
      onClick={() => eliminarTurno(r._id)}
      className="eliminar-btn"
      title="Eliminar turno"
      aria-label="Eliminar turno"
    >
      <FaTrash />
    </button>
  </td>
</tr>
  ))}
          </tbody>
        </table>
      </div>
      )}
      <div className="boton-derecha">
      <button onClick={limpiarTurnosAntiguos} className="logout-btn">
        🧹 Limpiar turnos antiguos
      </button></div>


      <div className="metric-grid">
        <MetricCard title="Reservas totales" value={turnos.length} icon="📦" />
        <MetricCard title="Reservas hoy" value={reservasHoy.length} icon="📅" />
        <MetricCard title="Próximas reservas" value={futuras.length} icon="⏳" />
      </div>

    <div className="chart-grid">
  <div className="chart-item">
    <h3 className="chart-title">📊 Reservas por día</h3>
    <BarChartReservas turnos={turnos} />
  </div>
  <div className="chart-item">
    <h3 className="chart-title">🕒 Distribución por horario</h3>
    <PieChartHorarios turnos={turnos} />
  </div>
</div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default PanelAdmin;