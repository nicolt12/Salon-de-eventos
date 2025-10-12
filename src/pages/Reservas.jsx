import { useEffect, useState, useRef } from "react";
import "./Reservas.css";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reservas() {
  const [turnos, setTurnos] = useState([]);
  const [ultimaCantidad, setUltimaCantidad] = useState(0);
  const isFirstLoad = useRef(true); // 👈 flag para evitar notificación inicial

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/reservas");
        const data = await res.json();
        const visitas = data.filter((r) => r.nombre);

        if (!isFirstLoad.current && visitas.length > ultimaCantidad) {
          toast.success("¡Nueva reserva recibida!");
        }

        setTurnos(visitas);
        setUltimaCantidad(visitas.length);
        isFirstLoad.current = false; // 👈 desactivamos el flag después del primer fetch
      } catch (err) {
        console.error("Error al obtener turnos:", err);
        toast.error("Error al obtener turnos");
      }
    };

    fetchTurnos(); // al montar

    const interval = setInterval(fetchTurnos, 10000); // cada 10 segundos
    return () => clearInterval(interval);
  }, [ultimaCantidad]);

  const eliminarTurno = async (id) => {
    if (!window.confirm("¿Eliminar este turno de visita?")) return;
    try {
      await fetch(`http://localhost:5000/api/reservas/${id}`, {
        method: "DELETE",
      });
      setTurnos(turnos.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error al eliminar:", err);
      toast.error("No se pudo eliminar el turno.");
    }
  };

  return (
    <div className="reservas-wrapper">
      <h2>Turnos agendados para visitar el salón</h2>

      {turnos.length === 0 ? (
        <p>No hay turnos registrados.</p>
      ) : (
        <table className="reservas-table" aria-label="Tabla de turnos de visita">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Comentarios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((r) => (
              <tr key={r._id}>
                <td>{r.nombre || "—"}</td>
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
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default Reservas;