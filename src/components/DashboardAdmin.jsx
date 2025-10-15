import React from "react";
import MetricCard from "./MetricCard";
import BarChartReservas from "./BarChartReservas";
import PieChartHorarios from "./PieChartHorarios";
import "./DashboardAdmin.css";

function DashboardAdmin({ turnos }) {
  const hoy = new Date().toISOString().split("T")[0];
  const reservasHoy = turnos.filter((r) => r.fecha === hoy);
  const futuras = turnos.filter((r) => new Date(r.fecha) > new Date());

  return (
    <div className="dashboard-wrapper">
      <h2>Panel de métricas</h2>
      <div className="metric-grid">
        <MetricCard title="Reservas totales" value={turnos.length} icon="📦" />
        <MetricCard title="Reservas hoy" value={reservasHoy.length} icon="📅" />
        <MetricCard title="Próximas reservas" value={futuras.length} icon="⏳" />
      </div>
      <div className="chart-grid">
        <BarChartReservas turnos={turnos} />
        <PieChartHorarios turnos={turnos} />
      </div>
    </div>
  );
}

export default DashboardAdmin;