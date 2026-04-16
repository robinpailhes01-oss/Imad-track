"use client";

import { useMemo, useState } from "react";
import { Shell } from "@/components/Shell";
import { Card, Chip, IconBadge, Money, SectionTitle } from "@/components/ui";
import { NetWorthArea } from "@/components/charts/NetWorthArea";
import { IncomeDonut } from "@/components/charts/IncomeDonut";
import { AddTransactionSheet } from "@/components/sheets/AddTransactionSheet";
import { useStore } from "@/lib/store";
import {
  expenseExtremes,
  incomeBreakdown,
  monthlyExpensesTotal,
  monthlyIncome,
  netWorthSeries,
  savingsRate,
  totalBalance,
} from "@/lib/derived";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function ReportsPage() {
  const { state } = useStore();
  const [txOpen, setTxOpen] = useState(false);

  const balance = useMemo(() => totalBalance(state), [state]);
  const nwSeries = useMemo(() => netWorthSeries(state, 30), [state]);
  const first = nwSeries[0]?.value ?? 0;
  const last = nwSeries[nwSeries.length - 1]?.value ?? 0;
  const nwDelta =
    first === 0 ? (last > 0 ? 100 : 0) : ((last - first) / Math.abs(first)) * 100;

  const { highest, lowest } = useMemo(() => expenseExtremes(state), [state]);
  const incomes = useMemo(() => incomeBreakdown(state), [state]);
  const mIncome = useMemo(() => monthlyIncome(state), [state]);
  const mExpense = useMemo(() => monthlyExpensesTotal(state), [state]);
  const save = useMemo(() => savingsRate(state), [state]);

  const insights: { icon: string; tint: string; accent: string; title: string; detail: string }[] = [];
  if (mIncome > 0) {
    insights.push({
      icon: "Sparkles",
      tint: "bg-surface-lilac",
      accent: "text-accent-purple",
      title: `Tu économises ${Math.round(save * 100)}% de tes revenus`,
      detail:
        save >= 0.3
          ? "Excellent, continue comme ça !"
          : "Essaie d'atteindre 30 % pour accélérer tes objectifs.",
    });
  }
  if (mExpense > mIncome && mIncome > 0) {
    insights.push({
      icon: "AlertTriangle",
      tint: "bg-surface-blush",
      accent: "text-accent-rose",
      title: "Dépenses supérieures aux revenus",
      detail: `−€${(mExpense - mIncome).toFixed(2)} ce mois-ci.`,
    });
  }
  if (state.transactions.length >= 5) {
    insights.push({
      icon: "BarChart3",
      tint: "bg-surface-cream",
      accent: "text-accent-amber",
      title: `${state.transactions.length} transactions enregistrées`,
      detail: "Zyric commence à dessiner une tendance fiable.",
    });
  }

  return (
    <Shell onAdd={() => setTxOpen(true)}>
      <div className="flex flex-col gap-4">
        {/* NET WORTH */}
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium text-ink-muted">
                Valeur nette totale
              </p>
              <div className="mt-1 flex items-center gap-2">
                <Money value={balance} />
                <Chip tone={nwDelta >= 0 ? "positive" : "negative"}>
                  {`${nwDelta >= 0 ? "+" : "−"}${Math.abs(nwDelta).toFixed(1)}%`}
                </Chip>
              </div>
            </div>
            <span className="flex h-8 items-center gap-1 rounded-full bg-surface-lilac px-3 text-[11px] font-semibold text-accent-purple">
              30 j
            </span>
          </div>
          <div className="mt-4">
            <NetWorthArea data={nwSeries} height={160} showAxis />
          </div>
        </Card>

        {/* HIGHEST / LOWEST */}
        <div className="grid grid-cols-2 gap-3">
          <Card padded={false} className="p-4">
            <div className="flex items-center justify-between">
              <IconBadge name="BarChart3" tint="bg-surface-lilac" accent="text-accent-purple" size={34} />
              <button className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/5 text-ink-muted">
                <ArrowUpRight size={12} strokeWidth={2.5} />
              </button>
            </div>
            <p className="mt-3 text-[11px] font-medium text-ink-muted">
              Dépense max
            </p>
            <div className="mt-1">
              <Money value={highest} sign={highest > 0} />
            </div>
            <p className="mt-1 text-[10px] text-ink-muted">
              {highest > 0 ? "Ce mois-ci" : "Aucun historique"}
            </p>
          </Card>

          <Card padded={false} className="p-4">
            <div className="flex items-center justify-between">
              <IconBadge name="TrendingDown" tint="bg-surface-blush" accent="text-accent-rose" size={34} />
              <button className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/5 text-ink-muted">
                <ArrowUpRight size={12} strokeWidth={2.5} />
              </button>
            </div>
            <p className="mt-3 text-[11px] font-medium text-ink-muted">
              Dépense min
            </p>
            <div className="mt-1">
              <Money value={lowest} sign={lowest > 0} />
            </div>
            <p className="mt-1 text-[10px] text-ink-muted">
              {lowest > 0 ? "Ce mois-ci" : "Aucun historique"}
            </p>
          </Card>
        </div>

        {/* INCOMES */}
        <Card>
          <SectionTitle
            title="Revenus"
            subtitle="Répartition du mois en cours"
          />
          <div className="mt-4 flex items-center justify-center">
            <IncomeDonut data={incomes} size={180} />
          </div>
          {incomes.length === 0 ? (
            <p className="mt-4 text-center text-[11px] text-ink-muted">
              Ajoute un revenu pour voir la répartition.
            </p>
          ) : (
            <ul className="mt-4 space-y-2">
              {incomes.map((item) => {
                const total = incomes.reduce((s, i) => s + i.value, 0);
                const pct = ((item.value / total) * 100).toFixed(1);
                return (
                  <li
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-3 py-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ background: item.color }}
                      />
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-ink-muted">{pct}%</p>
                      </div>
                    </div>
                    <Money value={item.value} />
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        {/* INSIGHTS */}
        <Card>
          <SectionTitle title="Insights" subtitle="Calculés à partir de vos données" />
          {insights.length === 0 ? (
            <div className="mt-4 flex flex-col items-center rounded-3xl border border-dashed border-ink/10 bg-white/50 p-6 text-center">
              <IconBadge name="Sparkles" tint="bg-surface-lilac" accent="text-accent-purple" size={44} />
              <p className="mt-3 font-display text-sm font-bold text-ink">
                Pas encore d'insights
              </p>
              <p className="mt-1 max-w-[280px] text-[11px] text-ink-muted">
                Ajoutez quelques transactions et Zyric générera automatiquement des analyses.
              </p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {insights.map((it, i) => (
                <li key={i} className="flex items-start gap-3 rounded-2xl border border-white/60 bg-white/70 p-3">
                  <IconBadge name={it.icon} tint={it.tint} accent={it.accent} size={38} />
                  <div>
                    <p className="text-sm font-semibold text-ink">{it.title}</p>
                    <p className="text-[11px] text-ink-muted">{it.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <AddTransactionSheet open={txOpen} onClose={() => setTxOpen(false)} />
    </Shell>
  );
}
