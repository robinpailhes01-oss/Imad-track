"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  Cell,
} from "recharts";
import { monthlyExpenses } from "@/lib/data";

export function ExpensesBarChart({ highlightIndex = -1 }: { highlightIndex?: number }) {
  // Si tout est à 0, on affiche des barres « vides » à hauteur égale
  // pour garder la forme visuelle.
  const total = monthlyExpenses.reduce((s, m) => s + m.value, 0);
  const data = total === 0
    ? monthlyExpenses.map((m) => ({ ...m, value: 1 }))
    : monthlyExpenses;

  return (
    <div className="h-36 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
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
              formatter={(v: number) => [`€${v.toLocaleString("fr-FR")}`, "Dépenses"]}
              labelStyle={{ color: "rgba(255,255,255,0.6)" }}
            />
          )}
          <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={12}>
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={i === highlightIndex ? "url(#barPink)" : "url(#barMuted)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
