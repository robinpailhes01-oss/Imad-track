"use client";

import { useMemo, useState } from "react";
import { Shell } from "@/components/Shell";
import { Card, Chip, IconBadge, Money, ProgressBar, SectionTitle } from "@/components/ui";
import { ExpensesBarChart } from "@/components/charts/ExpensesBarChart";
import { NetWorthArea } from "@/components/charts/NetWorthArea";
import { AddTransactionSheet } from "@/components/sheets/AddTransactionSheet";
import { GoalSheet } from "@/components/sheets/GoalSheet";
import { useStore } from "@/lib/store";
import {
  monthlyExpensesSeries,
  monthlyExpensesTotal,
  netWorthSeries,
  totalBalance,
} from "@/lib/derived";
import { getCategory } from "@/lib/categories";
import { ArrowUpRight, Inbox, Plus, Trash2, TrendingDown, TrendingUp } from "lucide-react";

export default function HomePage() {
  const { state, deleteTransaction } = useStore();
  const [txOpen, setTxOpen] = useState(false);
  const [goalOpen, setGoalOpen] = useState(false);

  const balance = useMemo(() => totalBalance(state), [state]);
  const nwSeries = useMemo(() => netWorthSeries(state, 30), [state]);
  const expensesMonth = useMemo(() => monthlyExpensesTotal(state), [state]);
  const expensesBars = useMemo(() => monthlyExpensesSeries(state), [state]);

  // Delta patrimoine (30 j)
  const first = nwSeries[0]?.value ?? 0;
  const last = nwSeries[nwSeries.length - 1]?.value ?? 0;
  const nwDelta =
    first === 0 ? (last > 0 ? 100 : 0) : ((last - first) / Math.abs(first)) * 100;

  const goal = state.goals[0];
  const goalProgress = goal && goal.target > 0 ? goal.saved / goal.target : 0;

  const recent = state.transactions.slice(0, 5);

  return (
    <Shell onAdd={() => setTxOpen(true)}>
      <div className="flex flex-col gap-4">
        {/* HERO BALANCE + NET WORTH CHART */}
        <section className="noise-hero relative overflow-hidden rounded-4xl bg-hero-gradient p-5 shadow-card">
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
                Solde total
              </p>
              <div className="mt-2">
                <Money value={balance} big className="balance-number" />
              </div>
              <p className="mt-2 text-[11px] text-ink-muted">
                {state.transactions.length
                  ? `${state.transactions.length} transaction${state.transactions.length > 1 ? "s" : ""}`
                  : "Aucune transaction pour l'instant"}
              </p>
            </div>
            <Chip tone={nwDelta >= 0 ? "positive" : "negative"} icon={nwDelta >= 0 ? "TrendingUp" : "TrendingDown"}>
              {`${nwDelta >= 0 ? "+" : "−"}${Math.abs(nwDelta).toFixed(1)}%`}
            </Chip>
          </div>

          {/* Net worth evolution chart */}
          <div className="relative z-10 mt-4 rounded-3xl bg-white/80 p-4 shadow-card backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                  Évolution du patrimoine
                </p>
                <p className="text-[11px] text-ink-muted">30 derniers jours</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-surface-lilac px-2 py-1 text-[10px] font-semibold text-accent-purple">
                {nwDelta >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {`${nwDelta >= 0 ? "+" : "−"}${Math.abs(nwDelta).toFixed(1)}%`}
              </span>
            </div>
            <div className="mt-2">
              <NetWorthArea data={nwSeries} height={110} />
            </div>
          </div>

          {/* Goal */}
          <div className="relative z-10 mt-4 rounded-3xl bg-white/80 p-4 shadow-card backdrop-blur">
            {goal ? (
              <button className="w-full text-left" onClick={() => setGoalOpen(true)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <IconBadge name="PiggyBank" tint="bg-surface-blush" accent="text-accent-rose" size={38} />
                    <div>
                      <p className="text-[11px] text-ink-muted">Objectif</p>
                      <p className="font-display text-sm font-bold text-ink">
                        {goal.title}
                      </p>
                    </div>
                  </div>
                  <Chip tone="positive" icon="TrendingUp">
                    {Math.round(goalProgress * 100)}%
                  </Chip>
                </div>
                <div className="mt-3">
                  <ProgressBar value={goalProgress} tone="pink" />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-ink-muted">
                  <span>€{goal.saved.toLocaleString("fr-FR")} / €{goal.target.toLocaleString("fr-FR")}</span>
                  <span>{goal.deadline}</span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => setGoalOpen(true)}
                className="flex w-full items-center gap-3 text-left"
              >
                <IconBadge name="PiggyBank" tint="bg-surface-blush" accent="text-accent-rose" size={38} />
                <div className="flex-1">
                  <p className="font-display text-sm font-bold text-ink">
                    Créer un objectif
                  </p>
                  <p className="text-[11px] text-ink-muted">
                    Fixe un montant à atteindre
                  </p>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white">
                  <Plus size={14} strokeWidth={2.5} />
                </span>
              </button>
            )}
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTxOpen(true)}
            className="flex items-center gap-3 rounded-3xl bg-ink p-4 text-left text-white shadow-pop active:scale-[.99]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
              <Plus size={18} strokeWidth={2.5} />
            </span>
            <div>
              <p className="text-[11px] opacity-70">Nouvelle</p>
              <p className="font-display text-sm font-bold">Transaction</p>
            </div>
          </button>
          <button
            onClick={() => setGoalOpen(true)}
            className="flex items-center gap-3 rounded-3xl border border-white/60 bg-white/90 p-4 text-left shadow-card active:scale-[.99]"
          >
            <IconBadge name="Target" tint="bg-surface-lilac" accent="text-accent-purple" size={40} />
            <div>
              <p className="text-[11px] text-ink-muted">Objectif</p>
              <p className="font-display text-sm font-bold text-ink">
                {goal ? "Modifier" : "Créer"}
              </p>
            </div>
          </button>
        </div>

        {/* EXPENSES SUMMARY */}
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium text-ink-muted">Dépenses du mois</p>
              <div className="mt-1">
                <Money value={expensesMonth} />
              </div>
            </div>
            <span className="flex h-8 items-center gap-1 rounded-full bg-surface-lilac px-3 text-[11px] font-semibold text-accent-purple">
              12 mois
            </span>
          </div>
          <div className="mt-3">
            <ExpensesBarChart data={expensesBars} />
          </div>
          {expensesMonth === 0 ? (
            <p className="mt-3 text-[11px] text-ink-muted">
              Aucune dépense enregistrée ce mois-ci.
            </p>
          ) : null}
        </Card>

        {/* RECENT TRANSACTIONS */}
        <Card>
          <SectionTitle
            title="Transactions récentes"
            subtitle={recent.length ? "Appuyez longuement pour supprimer" : "Vos derniers mouvements"}
            action={
              <button
                onClick={() => setTxOpen(true)}
                className="flex h-8 items-center gap-1 rounded-full bg-ink px-3 text-[11px] font-semibold text-white shadow-soft"
              >
                <Plus size={12} strokeWidth={2.8} />
                Ajouter
              </button>
            }
          />
          {recent.length === 0 ? (
            <EmptyState
              title="Aucune transaction"
              hint="Ajoute ta première dépense ou ton premier revenu pour voir le patrimoine évoluer."
            />
          ) : (
            <ul className="mt-3 divide-y divide-ink/5">
              {recent.map((t) => {
                const cat = getCategory(t.categoryId);
                return (
                  <li
                    key={t.id}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-3">
                      <IconBadge name={cat.icon} tint={cat.tint} accent={cat.accent} size={38} />
                      <div>
                        <p className="font-display text-sm font-semibold text-ink">
                          {t.label || cat.name}
                        </p>
                        <p className="text-[11px] text-ink-muted">
                          {cat.name} · {new Date(t.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Money
                        value={t.kind === "income" ? t.amount : -t.amount}
                        sign
                        className={t.kind === "income" ? "text-emerald-600" : "text-ink"}
                      />
                      <button
                        aria-label="Supprimer"
                        onClick={() => deleteTransaction(t.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/5 text-ink-muted hover:bg-rose-50 hover:text-rose-500"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>

      <AddTransactionSheet open={txOpen} onClose={() => setTxOpen(false)} />
      <GoalSheet
        open={goalOpen}
        onClose={() => setGoalOpen(false)}
        goal={goal ?? null}
      />
    </Shell>
  );
}

function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="mt-4 flex flex-col items-center rounded-3xl border border-dashed border-ink/10 bg-white/50 p-6 text-center">
      <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface-lilac text-accent-purple">
        <Inbox size={20} strokeWidth={2} />
      </span>
      <p className="font-display text-sm font-bold text-ink">{title}</p>
      <p className="mt-1 max-w-[260px] text-[11px] text-ink-muted">{hint}</p>
    </div>
  );
}
