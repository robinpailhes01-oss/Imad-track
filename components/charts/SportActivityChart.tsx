"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  Cell,
} from "recharts";

const data = [
  { month: "Jan", value: 220 },
  { month: "Fév", value: 310 },
  { month: "Mar", value: 190 },
  { month: "Avr", value: 420 },
  { month: "Mai", value: 350 },
  { month: "Jui", value: 170 },
  { month: "Jul", value: 260 },
];

export function SportActivityChart() {
  return (
    <div className="h-36 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="saBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
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
          <Tooltip
            cursor={{ fill: "rgba(236,72,153,0.05)" }}
            contentStyle={{
              border: "none",
              borderRadius: 14,
              background: "#0F0B1E",
              color: "#fff",
              fontSize: 12,
              padding: "8px 10px",
            }}
            formatter={(v: number) => [`€${v}`, "Activité"]}
          />
          <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={16}>
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={i === 3 ? "url(#saBar)" : "url(#saBarDim)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
