import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function BarChartReservas({ turnos }) {
  const porDia = {};

  turnos.forEach((r) => {
    porDia[r.fecha] = (porDia[r.fecha] || 0) + 1;
  });

  const data = Object.entries(porDia).map(([fecha, cantidad]) => ({
    fecha,
    cantidad,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad" fill="#7e57c2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartReservas;