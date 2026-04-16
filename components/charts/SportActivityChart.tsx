"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  Cell,
} from "recharts";

const data = [
  { month: "Jan", value: 1 },
  { month: "Fév", value: 1 },
  { month: "Mar", value: 1 },
  { month: "Avr", value: 1 },
  { month: "Mai", value: 1 },
  { month: "Jui", value: 1 },
  { month: "Jul", value: 1 },
];

export function SportActivityChart() {
  return (
    <div className="h-32 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="saBarDim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FCE7F3" />
              <stop offset="100%" stopColor="#F5D0E4" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9A93B2" }}
            dy={6}
          />
          <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={14}>
            {data.map((_, i) => (
              <Cell key={i} fill="url(#saBarDim)" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
