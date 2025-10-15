import { useState, useEffect } from "react";
import "./Booking.css";

function Booking() {
  const [form, setForm] = useState({
    nombre: "",
    fecha: "",
    horario: "",
    mensaje: "",
    email: ""
  });

  const [reservasDelDia, setReservasDelDia] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");
  const [cargando, setCargando] = useState(false); // ✅ nuevo estado

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const calcularHoraFin = () => {
    if (!form.horario) return "";
    const [hora, minutos] = form.horario.split(":").map(Number);
    const horaFin = (hora + 1) % 24;
    return `${horaFin.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchReservas = async () => {
      if (!form.fecha) return;
      try {
        const res = await fetch(`http://localhost:5000/api/reservas?fecha=${form.fecha}`);
        const data = await res.json();
        setReservasDelDia(data);
      } catch (err) {
        console.error("Error al traer reservas:", err);
      }
    };
    fetchReservas();
  }, [form.fecha]);

  const estaOcupado = (horaStr) => {
    return reservasDelDia.some((r) => r.horario === horaStr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cargando) return; // ✅ evita múltiples envíos
    setCargando(true);

    const hoy = new Date().toISOString().split("T")[0];
    if (form.fecha < hoy) {
      alert("No podés seleccionar una fecha pasada.");
      setCargando(false);
      return;
    }

    const [horaInicio] = form.horario.split(":").map(Number);
    if (horaInicio < 10 || horaInicio > 20) {
      alert("Los turnos deben ser entre las 10:00 y las 20:00.");
      setCargando(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          fecha: form.fecha,
          horario: form.horario,
          mensaje: form.mensaje,
          email: form.email,
          tipo: "visita",
        }),
      });

      if (response.ok) {
        setMensajeExito("🎉 ¡Turno solicitado con éxito!");
        setTimeout(() => setMensajeExito(""), 4000);
        setForm({ nombre: "", fecha: "", horario: "", mensaje: "", email: "" });
        setReservasDelDia([]);
      } else if (response.status === 409) {
        alert("Ya hay un turno agendado en ese horario.");
      } else {
        alert("Hubo un error al solicitar el turno.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión con el servidor.");
    } finally {
      setCargando(false); // ✅ reactiva el botón
    }
  };

  return (
    <div className="page-wrapper booking-page">
      <h2>Agendá tu visita al salón</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre completo"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input 
          type="email"
          name="email"
          placeholder="Tu correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          required
        />

        <div className="selector">
          <label>Horario de visita:</label>
          <div className="selector-buttons">
            {["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"].map((h) => (
              <button
                type="button"
                key={h}
                className={form.horario === h ? "selected" : ""}
                onClick={() => setForm({ ...form, horario: h })}
                disabled={estaOcupado(h)}
                style={estaOcupado(h) ? { opacity: 0.5, cursor: "not-allowed" } : {}}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        <textarea
          name="mensaje"
          placeholder="Comentarios o dudas (opcional)"
          value={form.mensaje}
          onChange={handleChange}
        />
        <button type="submit" disabled={cargando}>
          {cargando ? "Enviando..." : "Solicitar turno"}
        </button>
      </form>

      {mensajeExito && <div className="mensaje-exito">{mensajeExito}</div>}

      {form.horario && (
        <div className="hora-final-wrapper">
          <p>
            ⏱️ El turno finalizaría a las <strong>{calcularHoraFin()}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default Booking;