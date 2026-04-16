import { Shell } from "@/components/Shell";
import { Card, Chip, IconBadge, Money, ProgressBar, SectionTitle } from "@/components/ui";
import { ExpensesBarChart } from "@/components/charts/ExpensesBarChart";
import { SportActivityChart } from "@/components/charts/SportActivityChart";
import { categories, overview, recentTransactions } from "@/lib/data";
import { ArrowUpRight, Info } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { availableBalance, dailyAverage, spent, budgetCeiling, expensesMonth, expensesDelta, goal } = overview;

  return (
    <Shell>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* HERO BALANCE */}
        <section className="lg:col-span-2">
          <div className="noise-hero relative overflow-hidden rounded-5xl bg-hero-gradient p-6 shadow-card sm:p-8">
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                  Solde disponible
                </p>
                <div className="mt-3 flex items-end gap-2">
                  <Money value={availableBalance} big className="balance-number" />
                  <button
                    aria-label="Détails"
                    className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-ink-muted shadow-card"
                  >
                    <Info size={15} />
                  </button>
                </div>
                <p className="mt-2 text-sm text-ink-muted">
                  <span className="font-semibold text-ink">24 jours restants</span>
                  <span className="mx-1.5 text-ink-muted/60">·</span>
                  €{dailyAverage.toFixed(2)} par jour
                  <span className="mx-1.5 text-ink-muted/60">·</span>
                  Dernier
                </p>
                <p className="text-sm text-ink-muted">
                  €{spent.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} de €
                  {budgetCeiling.toLocaleString("fr-FR")}
                </p>
              </div>
              <Link
                href="/reports"
                className="flex h-10 items-center gap-1.5 rounded-full bg-white/80 px-3 text-xs font-semibold text-ink shadow-card backdrop-blur"
              >
                Détails
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </Link>
            </div>

            {/* Goal */}
            <div className="relative z-10 mt-7 rounded-3xl bg-white/80 p-4 shadow-card backdrop-blur">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <IconBadge name="PiggyBank" tint="bg-surface-blush" accent="text-accent-rose" size={40} />
                  <div>
                    <p className="text-xs text-ink-muted">Objectif</p>
                    <p className="font-display text-sm font-bold text-ink">
                      {goal.title}
                    </p>
                  </div>
                </div>
                <Chip tone="positive" icon="TrendingUp">
                  {Math.round(goal.progress * 100)}%
                </Chip>
              </div>
              <div className="mt-3">
                <ProgressBar value={goal.progress} tone="pink" />
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-ink-muted">
                <span>{goal.started}</span>
                <span>{goal.deadline}</span>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE - EXPENSES SUMMARY */}
        <section>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-ink-muted">Dépenses</p>
                <div className="mt-1 flex items-center gap-2">
                  <Money value={expensesMonth} />
                  <Chip tone="positive" icon="ArrowDown">
                    {expensesDelta}%
                  </Chip>
                </div>
              </div>
              <button className="flex h-9 items-center gap-1 rounded-full bg-surface-lilac px-3 text-[11px] font-semibold text-accent-purple">
                Année
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                  <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="mt-4">
              <ExpensesBarChart />
            </div>
            <p className="mt-3 text-[11px] text-ink-muted">
              Votre mois de mai reste le plus dépensier.
            </p>
          </Card>
        </section>

        {/* CATEGORIES */}
        <section className="lg:col-span-2">
          <Card>
            <SectionTitle
              title="Catégories"
              subtitle="Gérez vos budgets par thème"
              action={
                <Link
                  href="/budget"
                  className="rounded-full bg-ink px-4 py-2 text-[11px] font-semibold text-white shadow-soft"
                >
                  + Nouvelle catégorie
                </Link>
              }
            />
            <ul className="mt-4 space-y-2.5">
              {categories.slice(0, 4).map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between rounded-3xl border border-white/60 bg-white/80 px-3 py-2.5 transition hover:border-white hover:shadow-card"
                >
                  <div className="flex items-center gap-3">
                    <IconBadge name={c.icon} tint={c.tint} accent={c.accent} />
                    <div>
                      <p className="font-display text-sm font-semibold text-ink">
                        {c.name}
                      </p>
                      <p className="text-[11px] text-ink-muted">{c.subtitle}</p>
                    </div>
                  </div>
                  <button
                    aria-label={`Ouvrir ${c.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink-muted"
                  >
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* SPORT ACTIVITY */}
        <section>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-ink-muted">
                  Activité sportive
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Money value={-284.54} />
                  <Chip tone="positive" icon="ArrowDown">
                    14%
                  </Chip>
                </div>
                <p className="text-[11px] text-ink-muted">
                  sur les 30 derniers jours
                </p>
              </div>
              <button className="flex h-9 items-center gap-1 rounded-full bg-surface-blush px-3 text-[11px] font-semibold text-accent-rose">
                Mois
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                  <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="mt-4">
              <SportActivityChart />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-ink-muted">
              <span>01 jan 2026</span>
              <span className="font-semibold text-ink">Total −€984,32</span>
            </div>
          </Card>
        </section>

        {/* RECENT TRANSACTIONS */}
        <section className="lg:col-span-3">
          <Card>
            <SectionTitle
              title="Transactions récentes"
              subtitle="Vos derniers mouvements"
              action={
                <button className="text-[11px] font-semibold text-accent-purple">
                  Tout voir
                </button>
              }
            />
            <ul className="mt-4 divide-y divide-ink/5">
              {recentTransactions.map((t) => (
                <li key={t.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <IconBadge name={t.icon} tint={t.tint} accent={t.accent} size={40} />
                    <div>
                      <p className="font-display text-sm font-semibold text-ink">
                        {t.label}
                      </p>
                      <p className="text-[11px] text-ink-muted">
                        {t.merchant} · {t.date}
                      </p>
                    </div>
                  </div>
                  <Money
                    value={t.amount}
                    sign
                    className={t.amount >= 0 ? "text-emerald-600" : "text-ink"}
                  />
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </div>
    </Shell>
  );
}
