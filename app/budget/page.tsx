import { Shell } from "@/components/Shell";
import { Card, Chip, IconBadge, Money, ProgressBar, SectionTitle } from "@/components/ui";
import { budgets, overview } from "@/lib/data";
import { MoreVertical, Plus } from "lucide-react";

export default function BudgetPage() {
  const { incomeMonth, savingsRate, goal } = overview;

  const totalBudget = budgets.reduce((s, b) => s + b.amount, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);

  return (
    <Shell>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* INCOME + GOAL HERO */}
        <section className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-5xl bg-hero-gradient p-6 shadow-card sm:p-8 noise-hero">
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                  Revenus du mois
                </p>
                <div className="mt-3">
                  <Money value={incomeMonth} big />
                </div>
                <p className="mt-2 text-sm text-ink-muted">
                  Taux d'épargne :{" "}
                  <span className="font-semibold text-ink">
                    {Math.round(savingsRate * 100)}%
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Chip tone="positive" icon="TrendingUp">
                  +8,2%
                </Chip>
                <span className="text-[11px] text-ink-muted">vs mars</span>
              </div>
            </div>

            {/* Mini cards */}
            <div className="relative z-10 mt-6 grid grid-cols-3 gap-3">
              <MiniStat
                label="Business"
                value={3317}
                color="#F472B6"
              />
              <MiniStat
                label="Salaire"
                value={2841.29}
                color="#8B5CF6"
              />
              <MiniStat
                label="Invest."
                value={2267.92}
                color="#A78BFA"
              />
            </div>

            {/* Goal */}
            <div className="relative z-10 mt-6 rounded-3xl bg-white/80 p-4 shadow-card backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <IconBadge name="PiggyBank" tint="bg-surface-blush" accent="text-accent-rose" size={40} />
                  <div>
                    <p className="text-[11px] text-ink-muted">
                      €{goal.saved.toLocaleString("fr-FR")} économisés
                    </p>
                    <p className="font-display text-sm font-bold text-ink">
                      Ce mois
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

        {/* BUDGET SUMMARY */}
        <section>
          <Card>
            <p className="text-xs font-medium text-ink-muted">Budget global</p>
            <div className="mt-2">
              <Money value={totalBudget} big />
            </div>
            <div className="mt-4">
              <ProgressBar value={totalSpent / totalBudget} />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="text-ink-muted">
                <span className="font-semibold text-ink">
                  €{totalSpent.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}
                </span>{" "}
                dépensés
              </span>
              <span className="text-ink-muted">
                €{(totalBudget - totalSpent).toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                })}{" "}
                restants
              </span>
            </div>
          </Card>

          <button
            className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-3xl bg-ink text-sm font-semibold text-white shadow-pop transition hover:-translate-y-0.5"
            aria-label="Ajouter une catégorie de budget"
          >
            <Plus size={16} strokeWidth={2.5} />
            Ajouter une catégorie
          </button>
        </section>

        {/* BUDGETS BY CATEGORY */}
        <section className="lg:col-span-3">
          <Card>
            <SectionTitle
              title="Budget par catégorie"
              subtitle="Dépenses totales du mois"
              action={
                <button
                  aria-label="Plus d'options"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink-muted"
                >
                  <MoreVertical size={16} />
                </button>
              }
            />
            <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {budgets.map((b) => {
                const pct = b.spent / b.amount;
                const remaining = Math.max(0, b.amount - b.spent);
                return (
                  <li
                    key={b.id}
                    className="flex items-center gap-3 rounded-3xl border border-white/60 bg-white/80 p-3 transition hover:border-white hover:shadow-card"
                  >
                    <IconBadge name={b.icon} tint={b.tint} accent={b.accent} />
                    <div className="flex-1">
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
                          €{remaining.toFixed(2)} restants
                        </span>
                        <span className="font-semibold text-ink">
                          {Math.round(pct * 100)}%
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </section>
      </div>
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
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: color }}
        />
        <p className="text-[11px] font-medium text-ink-muted">{label}</p>
      </div>
      <p className="mt-1 font-display text-sm font-bold text-ink tabular-nums">
        €{value.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}
      </p>
    </div>
  );
}
