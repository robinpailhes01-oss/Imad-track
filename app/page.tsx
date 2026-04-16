import { Shell } from "@/components/Shell";
import { Card, Chip, IconBadge, Money, ProgressBar, SectionTitle } from "@/components/ui";
import { ExpensesBarChart } from "@/components/charts/ExpensesBarChart";
import { SportActivityChart } from "@/components/charts/SportActivityChart";
import { categories, overview, recentTransactions } from "@/lib/data";
import { ArrowUpRight, Info, Plus, Inbox } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { availableBalance, expensesMonth, goal } = overview;

  return (
    <Shell>
      <div className="flex flex-col gap-4">
        {/* HERO BALANCE */}
        <section className="noise-hero relative overflow-hidden rounded-4xl bg-hero-gradient p-5 shadow-card">
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
                Solde disponible
              </p>
              <div className="mt-2 flex items-end gap-2">
                <Money value={availableBalance} big className="balance-number" />
                <button
                  aria-label="Détails"
                  className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-ink-muted shadow-card"
                >
                  <Info size={13} />
                </button>
              </div>
              <p className="mt-2 text-[11px] text-ink-muted">
                Commencez par ajouter un revenu ou une dépense
              </p>
            </div>
          </div>

          {/* Goal */}
          <div className="relative z-10 mt-5 rounded-3xl bg-white/80 p-4 shadow-card backdrop-blur">
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
              <Chip tone="neutral">
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
        </section>

        {/* EXPENSES SUMMARY */}
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium text-ink-muted">Dépenses</p>
              <div className="mt-1">
                <Money value={expensesMonth} />
              </div>
            </div>
            <button className="flex h-8 items-center gap-1 rounded-full bg-surface-lilac px-3 text-[11px] font-semibold text-accent-purple">
              Année
              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="mt-3">
            <ExpensesBarChart />
          </div>
          <p className="mt-3 text-[11px] text-ink-muted">
            Aucune donnée pour l'instant.
          </p>
        </Card>

        {/* CATEGORIES */}
        <Card>
          <SectionTitle
            title="Catégories"
            subtitle="Créez un budget par thème"
            action={
              <Link
                href="/budget"
                className="flex h-8 items-center gap-1 rounded-full bg-ink px-3 text-[11px] font-semibold text-white shadow-soft"
              >
                <Plus size={12} strokeWidth={2.8} />
                Ajouter
              </Link>
            }
          />
          <ul className="mt-4 space-y-2">
            {categories.slice(0, 4).map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between rounded-3xl border border-white/60 bg-white/80 px-3 py-2.5"
              >
                <div className="flex items-center gap-3">
                  <IconBadge name={c.icon} tint={c.tint} accent={c.accent} size={38} />
                  <div>
                    <p className="font-display text-sm font-semibold text-ink">
                      {c.name}
                    </p>
                    <p className="text-[11px] text-ink-muted">{c.subtitle}</p>
                  </div>
                </div>
                <button
                  aria-label={`Ouvrir ${c.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink-muted"
                >
                  <ArrowUpRight size={13} strokeWidth={2.5} />
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* SPORT ACTIVITY */}
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium text-ink-muted">
                Activité sportive
              </p>
              <div className="mt-1">
                <Money value={0} />
              </div>
              <p className="text-[11px] text-ink-muted">30 derniers jours</p>
            </div>
            <button className="flex h-8 items-center gap-1 rounded-full bg-surface-blush px-3 text-[11px] font-semibold text-accent-rose">
              Mois
              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="mt-3">
            <SportActivityChart />
          </div>
        </Card>

        {/* RECENT TRANSACTIONS */}
        <Card>
          <SectionTitle
            title="Transactions récentes"
            subtitle="Vos derniers mouvements"
          />
          {recentTransactions.length === 0 ? (
            <EmptyState
              title="Aucune transaction"
              hint="Ajoutez votre première transaction pour commencer à suivre vos finances."
            />
          ) : (
            <ul className="mt-3 divide-y divide-ink/5">
              {recentTransactions.map((t) => (
                <li key={t.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <IconBadge name={t.icon} tint={t.tint} accent={t.accent} size={38} />
                    <div>
                      <p className="font-display text-sm font-semibold text-ink">
                        {t.label}
                      </p>
                      <p className="text-[11px] text-ink-muted">
                        {t.merchant} · {t.date}
                      </p>
                    </div>
                  </div>
                  <Money value={t.amount} sign />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
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
