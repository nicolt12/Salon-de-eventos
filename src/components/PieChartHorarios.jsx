import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function PieChartHorarios({ turnos }) {
  const porHorario = {};

  turnos.forEach((r) => {
    porHorario[r.horario] = (porHorario[r.horario] || 0) + 1;
  });

  const data = Object.entries(porHorario).map(([horario, cantidad]) => ({
    name: horario,
    value: cantidad,
  }));

  const colores = ["#8e24aa", "#d81b60", "#43a047", "#039be5", "#fdd835"];

  return (
    <div style={{ width: "100%", height: 300 }}>
      
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
            {data.map((_, i) => (
              <Cell key={`cell-${i}`} fill={colores[i % colores.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartHorarios;