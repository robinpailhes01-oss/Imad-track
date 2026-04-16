"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { incomeBreakdown } from "@/lib/data";

export function IncomeDonut({ size = 180 }: { size?: number }) {
  const total = incomeBreakdown.reduce((s, x) => s + x.value, 0);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer>
        <PieChart>
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
              `€${v.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}`,
              name as string,
            ]}
          />
          <Pie
            data={incomeBreakdown}
            dataKey="value"
            nameKey="name"
            innerRadius={size / 2 - 28}
            outerRadius={size / 2 - 6}
            paddingAngle={4}
            cornerRadius={12}
            stroke="none"
          >
            {incomeBreakdown.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
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
