"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { netWorthSeries } from "@/lib/data";

export function NetWorthChart() {
  return (
    <div className="h-44 w-full">
      <ResponsiveContainer>
        <AreaChart
          data={netWorthSeries}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="nwArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F472B6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#F472B6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="nwStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#9A93B2" }}
            interval={1}
          />
          <YAxis hide domain={["dataMin - 100", "dataMax + 100"]} />
          <Tooltip
            cursor={{ stroke: "#A78BFA", strokeDasharray: 3 }}
            contentStyle={{
              border: "none",
              borderRadius: 14,
              background: "#0F0B1E",
              color: "#fff",
              fontSize: 12,
              padding: "8px 10px",
            }}
            formatter={(v: number) => [
              `€${v.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}`,
              "Valeur nette",
            ]}
            labelStyle={{ color: "rgba(255,255,255,0.6)" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="url(#nwStroke)"
            strokeWidth={2.5}
            fill="url(#nwArea)"
            dot={{ r: 2.5, strokeWidth: 0, fill: "#F472B6" }}
            activeDot={{ r: 5, strokeWidth: 3, stroke: "#fff", fill: "#F472B6" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
