import { Shell } from "@/components/Shell";
import { Card, Chip, IconBadge, Money, SectionTitle } from "@/components/ui";
import { NetWorthChart } from "@/components/charts/NetWorthChart";
import { IncomeDonut } from "@/components/charts/IncomeDonut";
import { incomeBreakdown, overview } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function ReportsPage() {
  const { netWorth, highestExpense, lowestExpense } = overview;

  return (
    <Shell>
      <div className="flex flex-col gap-4">
        {/* NET WORTH */}
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium text-ink-muted">
                Valeur nette totale
              </p>
              <div className="mt-1 flex items-center gap-2">
                <Money value={netWorth} />
                <Chip tone="neutral">0%</Chip>
              </div>
            </div>
            <button className="flex h-8 items-center gap-1 rounded-full bg-surface-lilac px-3 text-[11px] font-semibold text-accent-purple">
              Mois
              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="mt-4">
            <NetWorthChart />
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
              <Money value={highestExpense} sign />
            </div>
            <p className="mt-1 text-[10px] text-ink-muted">
              Aucun historique
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
              <Money value={lowestExpense} sign />
            </div>
            <p className="mt-1 text-[10px] text-ink-muted">
              Aucun historique
            </p>
          </Card>
        </div>

        {/* INCOMES */}
        <Card>
          <SectionTitle
            title="Revenus"
            subtitle="Répartition de vos sources"
          />
          <div className="mt-4 flex items-center justify-center">
            <IncomeDonut size={180} />
          </div>
          <ul className="mt-4 space-y-2">
            {incomeBreakdown.map((item) => (
              <li
                key={item.name}
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
                    <p className="text-[11px] text-ink-muted">0%</p>
                  </div>
                </div>
                <Money value={item.value} />
              </li>
            ))}
          </ul>
        </Card>

        {/* INSIGHTS */}
        <Card>
          <SectionTitle title="Insights" subtitle="Ce mois-ci" />
          <div className="mt-4 flex flex-col items-center rounded-3xl border border-dashed border-ink/10 bg-white/50 p-6 text-center">
            <IconBadge name="Sparkles" tint="bg-surface-lilac" accent="text-accent-purple" size={44} />
            <p className="mt-3 font-display text-sm font-bold text-ink">
              Pas encore d'insights
            </p>
            <p className="mt-1 max-w-[280px] text-[11px] text-ink-muted">
              Ajoutez des transactions pour que Zyric génère automatiquement des analyses personnalisées.
            </p>
          </div>
        </Card>
      </div>
    </Shell>
  );
}
