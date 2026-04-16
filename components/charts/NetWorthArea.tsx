"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Point = { day: string; label: string; value: number };

export function NetWorthArea({
  data,
  height = 120,
  showAxis = false,
  gradientId = "nwArea2",
  strokeId = "nwStroke2",
}: {
  data: Point[];
  height?: number;
  showAxis?: boolean;
  gradientId?: string;
  strokeId?: string;
}) {
  const total = data.reduce((s, d) => s + Math.abs(d.value), 0);

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#F472B6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={showAxis ? { fontSize: 10, fill: "#9A93B2" } : false}
            interval="preserveStartEnd"
            hide={!showAxis}
          />
          <YAxis hide domain={["dataMin - 50", "dataMax + 50"]} />
          {total > 0 && (
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
                `€${Number(v).toLocaleString("fr-FR", { maximumFractionDigits: 2 })}`,
                "Patrimoine",
              ]}
              labelStyle={{ color: "rgba(255,255,255,0.6)" }}
            />
          )}
          <Area
            type="monotone"
            dataKey="value"
            stroke={`url(#${strokeId})`}
            strokeWidth={2.5}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 3, stroke: "#fff", fill: "#F472B6" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
