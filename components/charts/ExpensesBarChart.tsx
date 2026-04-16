"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  Cell,
} from "recharts";

type Point = { month: string; value: number; highlight?: boolean };

export function ExpensesBarChart({ data }: { data: Point[] }) {
  const total = data.reduce((s, m) => s + m.value, 0);
  const rendered =
    total === 0 ? data.map((m) => ({ ...m, value: 1 })) : data;

  return (
    <div className="h-36 w-full">
      <ResponsiveContainer>
        <BarChart data={rendered} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="barPink" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#FB7185" />
            </linearGradient>
            <linearGradient id="barMuted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5E8FF" />
              <stop offset="100%" stopColor="#FBE3EE" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9A93B2" }}
            dy={6}
          />
          {total > 0 && (
            <Tooltip
              cursor={{ fill: "rgba(139,92,246,0.05)" }}
              contentStyle={{
                border: "none",
                borderRadius: 14,
                background: "#0F0B1E",
                color: "#fff",
                fontSize: 12,
                padding: "8px 10px",
              }}
              formatter={(v: number) => [
                `€${Number(v).toLocaleString("fr-FR")}`,
                "Dépenses",
              ]}
              labelStyle={{ color: "rgba(255,255,255,0.6)" }}
            />
          )}
          <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={12}>
            {rendered.map((d, i) => (
              <Cell
                key={i}
                fill={d.highlight && total > 0 ? "url(#barPink)" : "url(#barMuted)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
