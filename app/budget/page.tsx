"use client";

import { useMemo, useState } from "react";
import { Shell } from "@/components/Shell";
import { Card, Chip, IconBadge, Money, ProgressBar, SectionTitle } from "@/components/ui";
import { BudgetSheet } from "@/components/sheets/BudgetSheet";
import { GoalSheet } from "@/components/sheets/GoalSheet";
import { AddTransactionSheet } from "@/components/sheets/AddTransactionSheet";
import { useStore } from "@/lib/store";
import type { Budget } from "@/lib/types";
import {
  budgetSpent,
  incomeBreakdown,
  monthlyIncome,
  savingsRate,
} from "@/lib/derived";
import { Inbox, Pencil, Plus } from "lucide-react";

export default function BudgetPage() {
  const { state } = useStore();
  const [budgetSheet, setBudgetSheet] = useState<{ open: boolean; budget?: Budget | null }>({
    open: false,
    budget: null,
  });
  const [goalOpen, setGoalOpen] = useState(false);
  const [txOpen, setTxOpen] = useState(false);

  const income = useMemo(() => monthlyIncome(state), [state]);
  const save = useMemo(() => savingsRate(state), [state]);
  const incomes = useMemo(() => incomeBreakdown(state), [state]);

  // Top 3 revenus pour les mini cards
  const topIncomes = incomes.slice(0, 3);

  const totalBudget = state.budgets.reduce((s, b) => s + b.amount, 0);
  const totalSpent = state.budgets.reduce((s, b) => s + budgetSpent(state, b), 0);
  const globalPct = totalBudget > 0 ? totalSpent / totalBudget : 0;

  const goal = state.goals[0];
  const goalProgress = goal && goal.target > 0 ? goal.saved / goal.target : 0;

  return (
    <Shell onAdd={() => setTxOpen(true)}>
      <div className="flex flex-col gap-4">
        {/* INCOME HERO */}
        <section className="noise-hero relative overflow-hidden rounded-4xl bg-hero-gradient p-5 shadow-card">
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
                Revenus du mois
              </p>
              <div className="mt-2">
                <Money value={income} big />
              </div>
              <p className="mt-2 text-[11px] text-ink-muted">
                Taux d'épargne :{" "}
                <span className="font-semibold text-ink">
                  {Math.round(save * 100)}%
                </span>
              </p>
            </div>
            <Chip tone={save >= 0.2 ? "positive" : "neutral"}>
              {save >= 0.2 ? "+" : ""}{Math.round(save * 100)}%
            </Chip>
          </div>

          {/* Mini cards */}
          <div className="relative z-10 mt-5 grid grid-cols-3 gap-2">
            {topIncomes.length === 0
              ? [
                  { label: "Salaire", value: 0, color: "#8B5CF6" },
                  { label: "Freelance", value: 0, color: "#F472B6" },
                  { label: "Invest.", value: 0, color: "#A78BFA" },
                ].map((m) => <MiniStat key={m.label} {...m} />)
              : topIncomes.map((m) => (
                  <MiniStat
                    key={m.id}
                    label={m.name}
                    value={m.value}
                    color={m.color}
                  />
                ))}
          </div>

          {/* Goal */}
          <button
            onClick={() => setGoalOpen(true)}
            className="relative z-10 mt-5 flex w-full flex-col rounded-3xl bg-white/80 p-4 text-left shadow-card backdrop-blur active:scale-[.995]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <IconBadge name="PiggyBank" tint="bg-surface-blush" accent="text-accent-rose" size={38} />
                <div>
                  <p className="text-[11px] text-ink-muted">
                    {goal ? `€${goal.saved.toLocaleString("fr-FR")} économisés` : "Aucun objectif"}
                  </p>
                  <p className="font-display text-sm font-bold text-ink">
                    {goal ? goal.title : "Créer un objectif"}
                  </p>
                </div>
              </div>
              <Chip tone={goalProgress > 0 ? "positive" : "neutral"}>
                {Math.round(goalProgress * 100)}%
              </Chip>
            </div>
            <div className="mt-3">
              <ProgressBar value={goalProgress} tone="pink" />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-ink-muted">
              <span>{goal?.started ?? "—"}</span>
              <span>{goal?.deadline ?? "—"}</span>
            </div>
          </button>
        </section>

        {/* BUDGET SUMMARY */}
        <Card>
          <p className="text-[11px] font-medium text-ink-muted">Budget global</p>
          <div className="mt-1">
            <Money value={totalBudget} big />
          </div>
          <div className="mt-4">
            <ProgressBar value={globalPct} tone={globalPct > 0.9 ? "pink" : "brand"} />
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-ink-muted">
              <span className="font-semibold text-ink">
                €{totalSpent.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}
              </span>{" "}
              dépensés
            </span>
            <span className="text-ink-muted">
              €{Math.max(0, totalBudget - totalSpent).toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
              })}{" "}
              restants
            </span>
          </div>
        </Card>

        <button
          onClick={() => setBudgetSheet({ open: true, budget: null })}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-3xl bg-ink text-sm font-semibold text-white shadow-pop active:scale-[.99]"
        >
          <Plus size={16} strokeWidth={2.5} />
          Ajouter une catégorie
        </button>

        {/* BUDGETS BY CATEGORY */}
        <Card>
          <SectionTitle
            title="Budget par catégorie"
            subtitle="Dépenses totales du mois"
          />
          {state.budgets.length === 0 ? (
            <div className="mt-4 flex flex-col items-center rounded-3xl border border-dashed border-ink/10 bg-white/50 p-6 text-center">
              <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface-lilac text-accent-purple">
                <Inbox size={20} strokeWidth={2} />
              </span>
              <p className="font-display text-sm font-bold text-ink">
                Aucun budget
              </p>
              <p className="mt-1 max-w-[260px] text-[11px] text-ink-muted">
                Crée un budget par catégorie pour suivre tes dépenses mensuelles.
              </p>
            </div>
          ) : (
            <ul className="mt-4 space-y-2.5">
              {state.budgets.map((b) => {
                const spent = budgetSpent(state, b);
                const pct = b.amount > 0 ? spent / b.amount : 0;
                const remaining = Math.max(0, b.amount - spent);
                return (
                  <li
                    key={b.id}
                    className="flex items-center gap-3 rounded-3xl border border-white/60 bg-white/80 p-3"
                  >
                    <IconBadge name={b.icon} tint={b.tint} accent={b.accent} size={40} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-display text-sm font-semibold text-ink">
                          {b.name}
                        </p>
                        <Money value={b.amount} />
                      </div>
                      <div className="mt-1.5">
                        <ProgressBar value={pct} thin tone={pct > 0.9 ? "pink" : "brand"} />
                      </div>
                      <div className="mt-1.5 flex items-center justify-between text-[11px] text-ink-muted">
                        <span>
                          €{spent.toFixed(2)} / €{b.amount.toFixed(2)}
                        </span>
                        <span className="font-semibold text-ink">
                          {Math.round(pct * 100)}%
                        </span>
                      </div>
                    </div>
                    <button
                      aria-label={`Modifier ${b.name}`}
                      onClick={() => setBudgetSheet({ open: true, budget: b })}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink-muted"
                    >
                      <Pencil size={13} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>

      <BudgetSheet
        open={budgetSheet.open}
        onClose={() => setBudgetSheet({ open: false, budget: null })}
        budget={budgetSheet.budget ?? null}
      />
      <GoalSheet
        open={goalOpen}
        onClose={() => setGoalOpen(false)}
        goal={goal ?? null}
      />
      <AddTransactionSheet open={txOpen} onClose={() => setTxOpen(false)} />
    </Shell>
  );
}

function MiniStat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-2xl bg-white/80 p-3 shadow-card backdrop-blur">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full" style={{ background: color }} />
        <p className="text-[10px] font-medium text-ink-muted line-clamp-1">{label}</p>
      </div>
      <p className="mt-1 font-display text-xs font-bold text-ink tabular-nums">
        €{value.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}
      </p>
    </div>
  );
}
