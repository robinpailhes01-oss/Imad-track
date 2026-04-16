"use client";

import { ReactNode } from "react";
import { Icon } from "./Icon";

export function Card({
  className = "",
  children,
  padded = true,
}: {
  className?: string;
  children: ReactNode;
  padded?: boolean;
}) {
  return (
    <div
      className={`rounded-4xl border border-white/70 bg-white/90 shadow-card backdrop-blur-sm ${
        padded ? "p-5 sm:p-6" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  action,
  subtitle,
}: {
  title: string;
  action?: ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
        {subtitle ? (
          <p className="text-xs text-ink-muted">{subtitle}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function Money({
  value,
  currency = "€",
  big = false,
  sign = false,
  className = "",
}: {
  value: number;
  currency?: string;
  big?: boolean;
  sign?: boolean;
  className?: string;
}) {
  const negative = value < 0;
  const abs = Math.abs(value);
  const [intPart, centsPart] = abs.toFixed(2).split(".");
  const intFmt = Number(intPart).toLocaleString("fr-FR");

  return (
    <span
      className={`tabular-nums font-display ${
        big ? "text-5xl font-extrabold" : "font-semibold"
      } ${className}`}
    >
      {sign ? (negative ? "−" : "+") : negative ? "−" : ""}
      {currency}
      {intFmt}
      <span className={big ? "cents" : "text-ink-muted"}>.{centsPart}</span>
    </span>
  );
}

export function Chip({
  tone = "neutral",
  children,
  icon,
}: {
  tone?: "positive" | "negative" | "neutral";
  children: ReactNode;
  icon?: string;
}) {
  const palette =
    tone === "positive"
      ? "bg-emerald-50 text-emerald-600"
      : tone === "negative"
      ? "bg-rose-50 text-rose-500"
      : "bg-surface-lilac text-accent-purple";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${palette}`}
    >
      {icon ? <Icon name={icon} size={12} strokeWidth={2.5} /> : null}
      {children}
    </span>
  );
}

export function IconBadge({
  name,
  tint = "bg-surface-lilac",
  accent = "text-accent-purple",
  size = 44,
}: {
  name: string;
  tint?: string;
  accent?: string;
  size?: number;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-2xl ${tint} ${accent}`}
      style={{ width: size, height: size }}
    >
      <Icon name={name} size={Math.round(size * 0.45)} strokeWidth={2.2} />
    </span>
  );
}

export function ProgressBar({
  value,
  tone = "brand",
  thin = false,
}: {
  value: number; // 0..1
  tone?: "brand" | "pink" | "mint";
  thin?: boolean;
}) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  const bar =
    tone === "pink"
      ? "bg-gradient-to-r from-rose-400 to-pink-500"
      : tone === "mint"
      ? "bg-gradient-to-r from-emerald-300 to-emerald-500"
      : "bg-pill-gradient";
  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-ink/5 ${
        thin ? "h-1.5" : "h-2.5"
      }`}
    >
      <div
        className={`h-full rounded-full ${bar}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
