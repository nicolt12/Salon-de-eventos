import { useEffect, useState } from "react";
import "./Reservas.css";
import { FaTrash, FaUserClock } from "react-icons/fa";

function Reservas() {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const res = await fetch("/api/reservas");;
        const data = await res.json();
        console.log(data);

        const visitas = data.filter((r) => r.nombre);
        setTurnos(visitas);
      } catch (err) {
        console.error("Error al obtener turnos:", err);
      }
    };
    fetchTurnos();
  }, []);

  const eliminarTurno = async (id) => {
    if (!window.confirm("¿Eliminar este turno de visita?")) return;
    try {
      await fetch(`http://localhost:5000/api/reservas/${id}`, {
        method: "DELETE",
      });
      setTurnos(turnos.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("No se pudo eliminar el turno.");
    }
  };

  return (
    <div className="reservas-wrapper">
      <h2>
        Turnos agendados para visitar el salón
      </h2>

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
    </div>
  );
}

export default Reservas;