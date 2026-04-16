"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Slice = { name: string; value: number; color: string };

export function IncomeDonut({
  data,
  size = 180,
}: {
  data: Slice[];
  size?: number;
}) {
  const total = data.reduce((s, x) => s + x.value, 0);
  const pie =
    total === 0
      ? [{ name: "Vide", value: 1, color: "#EEE8FA" }]
      : data;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer>
        <PieChart>
          {total > 0 && (
            <Tooltip
              cursor={false}
              contentStyle={{
                border: "none",
                borderRadius: 14,
                background: "#0F0B1E",
                color: "#fff",
                fontSize: 12,
                padding: "8px 10px",
              }}
              formatter={(v: number, name) => [
                `€${Number(v).toLocaleString("fr-FR", { maximumFractionDigits: 2 })}`,
                name as string,
              ]}
            />
          )}
          <Pie
            data={pie}
            dataKey="value"
            nameKey="name"
            innerRadius={size / 2 - 28}
            outerRadius={size / 2 - 6}
            paddingAngle={total > 0 ? 4 : 0}
            cornerRadius={12}
            stroke="none"
          >
            {pie.map((entry, i) => (
              <Cell key={`${entry.name}-${i}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] font-medium uppercase tracking-wider text-ink-muted">
          Revenus
        </span>
        <span className="font-display text-xl font-bold text-ink">
          €{total.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
}
