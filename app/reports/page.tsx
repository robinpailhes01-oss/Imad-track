import { Shell } from "@/components/Shell";
import { Card, Chip, IconBadge, Money, SectionTitle } from "@/components/ui";
import { NetWorthChart } from "@/components/charts/NetWorthChart";
import { IncomeDonut } from "@/components/charts/IncomeDonut";
import { incomeBreakdown, overview } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function ReportsPage() {
  const { netWorth, netWorthDelta, highestExpense, highestExpenseDelta, lowestExpense } = overview;

  return (
    <Shell>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* NET WORTH */}
        <section className="lg:col-span-2">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-ink-muted">
                  Valeur nette totale
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Money value={netWorth} />
                  <Chip tone={netWorthDelta < 0 ? "negative" : "positive"} icon={netWorthDelta < 0 ? "ArrowDown" : "ArrowUp"}>
                    {Math.abs(netWorthDelta)}%
                  </Chip>
                </div>
              </div>
              <button className="flex h-9 items-center gap-1 rounded-full bg-surface-lilac px-3 text-[11px] font-semibold text-accent-purple">
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
        </section>

        {/* HIGHEST / LOWEST */}
        <section>
          <div className="grid grid-cols-1 gap-5">
            <Card>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconBadge name="BarChart3" tint="bg-surface-lilac" accent="text-accent-purple" size={36} />
                  <p className="text-xs font-medium text-ink-muted">
                    Dépense la plus élevée
                  </p>
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink-muted">
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Money value={highestExpense} sign />
                <Chip tone="positive" icon="TrendingDown">
                  {highestExpenseDelta}%
                </Chip>
              </div>
              <p className="text-[11px] text-ink-muted">
                Mois dernier : €587,90
              </p>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconBadge name="TrendingDown" tint="bg-surface-blush" accent="text-accent-rose" size={36} />
                  <p className="text-xs font-medium text-ink-muted">
                    Dépense la plus faible
                  </p>
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink-muted">
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Money value={lowestExpense} sign />
                <Chip tone="positive" icon="ArrowDown">
                  3,2%
                </Chip>
              </div>
              <p className="text-[11px] text-ink-muted">
                Mois dernier : €81,40
              </p>
            </Card>
          </div>
        </section>

        {/* INCOMES */}
        <section className="lg:col-span-2">
          <Card>
            <SectionTitle
              title="Revenus"
              subtitle="Revenus réguliers et croissance"
              action={
                <Chip tone="positive" icon="TrendingUp">
                  Croissance stable
                </Chip>
              }
            />
            <div className="mt-5 grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
              <div className="flex items-center justify-center">
                <IncomeDonut size={200} />
              </div>
              <ul className="space-y-3">
                {incomeBreakdown.map((item) => {
                  const total = incomeBreakdown.reduce((s, i) => s + i.value, 0);
                  const pct = ((item.value / total) * 100).toFixed(1);
                  return (
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
                          <p className="text-[11px] text-ink-muted">{pct}%</p>
                        </div>
                      </div>
                      <Money value={item.value} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </Card>
        </section>

        {/* INSIGHTS */}
        <section>
          <Card>
            <SectionTitle title="Insights" subtitle="Ce mois-ci" />
            <ul className="mt-4 space-y-3">
              <InsightItem
                icon="Sparkles"
                tint="bg-surface-lilac"
                accent="text-accent-purple"
                title="Vous économisez 66% de vos revenus"
                detail="Excellent ! C'est +12% vs le mois dernier."
              />
              <InsightItem
                icon="Coffee"
                tint="bg-surface-cream"
                accent="text-accent-amber"
                title="Café & restaurants en hausse"
                detail="€148 dépensés, soit +22 % vs avril dernier."
              />
              <InsightItem
                icon="Zap"
                tint="bg-surface-blush"
                accent="text-accent-rose"
                title="Abonnements inactifs détectés"
                detail="3 services non utilisés ce trimestre : −€47/mois possibles."
              />
            </ul>
          </Card>
        </section>
      </div>
    </Shell>
  );
}

function InsightItem({
  icon,
  tint,
  accent,
  title,
  detail,
}: {
  icon: string;
  tint: string;
  accent: string;
  title: string;
  detail: string;
}) {
  return (
    <li className="flex items-start gap-3 rounded-2xl border border-white/60 bg-white/70 p-3">
      <IconBadge name={icon} tint={tint} accent={accent} size={38} />
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="text-[11px] text-ink-muted">{detail}</p>
      </div>
    </li>
  );
}
