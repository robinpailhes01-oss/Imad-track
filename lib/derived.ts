import type { Budget, StoreState, Transaction } from "./types";
import { getCategory } from "./categories";

export function signedAmount(t: Transaction): number {
  return t.kind === "income" ? t.amount : -t.amount;
}

export function totalBalance(state: StoreState): number {
  return state.transactions.reduce((s, t) => s + signedAmount(t), 0);
}

export function monthKey(d: string | Date): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function startOfMonth(date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function currentMonthTransactions(state: StoreState): Transaction[] {
  const key = monthKey(new Date());
  return state.transactions.filter((t) => monthKey(t.date) === key);
}

export function monthlyIncome(state: StoreState): number {
  return currentMonthTransactions(state)
    .filter((t) => t.kind === "income")
    .reduce((s, t) => s + t.amount, 0);
}

export function monthlyExpensesTotal(state: StoreState): number {
  return currentMonthTransactions(state)
    .filter((t) => t.kind === "expense")
    .reduce((s, t) => s + t.amount, 0);
}

// Série 12 mois glissants de dépenses (chart Home)
export function monthlyExpensesSeries(
  state: StoreState
): { month: string; key: string; value: number; highlight: boolean }[] {
  const now = new Date();
  const labels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const out: { month: string; key: string; value: number; highlight: boolean }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = monthKey(d);
    const value = state.transactions
      .filter((t) => t.kind === "expense" && monthKey(t.date) === key)
      .reduce((s, t) => s + t.amount, 0);
    out.push({
      month: labels[d.getMonth()],
      key,
      value,
      highlight: i === 0,
    });
  }
  return out;
}

// Série d'évolution du patrimoine (running balance, par jour).
// Si aucune transaction, renvoie une série plate sur les 7 derniers jours.
export function netWorthSeries(
  state: StoreState,
  days = 30
): { day: string; label: string; value: number }[] {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (days - 1));

  // Additions cumulées jusqu'à `from` (valeur de départ)
  let base = 0;
  for (const t of state.transactions) {
    const d = new Date(t.date);
    if (d < from) base += signedAmount(t);
  }

  // Regroupe les mouvements par jour
  const byDay = new Map<string, number>();
  for (const t of state.transactions) {
    const d = new Date(t.date);
    if (d < from) continue;
    const k = d.toISOString().slice(0, 10);
    byDay.set(k, (byDay.get(k) ?? 0) + signedAmount(t));
  }

  const series: { day: string; label: string; value: number }[] = [];
  const short = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short" });

  let running = base;
  for (let i = 0; i < days; i++) {
    const d = new Date(from);
    d.setDate(from.getDate() + i);
    const k = d.toISOString().slice(0, 10);
    running += byDay.get(k) ?? 0;
    series.push({ day: k, label: short.format(d), value: running });
  }

  return series;
}

// Répartition des revenus par catégorie (pour le donut)
export function incomeBreakdown(
  state: StoreState
): { name: string; value: number; color: string; id: string }[] {
  const palette = [
    "#8B5CF6",
    "#F472B6",
    "#A78BFA",
    "#34D399",
    "#F59E0B",
    "#38BDF8",
    "#FB7185",
  ];
  const month = currentMonthTransactions(state).filter((t) => t.kind === "income");
  const byCat = new Map<string, number>();
  for (const t of month) byCat.set(t.categoryId, (byCat.get(t.categoryId) ?? 0) + t.amount);
  return Array.from(byCat.entries()).map(([id, value], i) => ({
    id,
    name: getCategory(id).name,
    value,
    color: palette[i % palette.length],
  }));
}

// Montant dépensé ce mois pour un budget donné
export function budgetSpent(state: StoreState, budget: Budget): number {
  const key = monthKey(new Date());
  return state.transactions
    .filter(
      (t) =>
        t.kind === "expense" &&
        monthKey(t.date) === key &&
        t.categoryId === budget.categoryId
    )
    .reduce((s, t) => s + t.amount, 0);
}

// Dépense la plus élevée et la plus faible ce mois
export function expenseExtremes(state: StoreState): {
  highest: number;
  lowest: number;
} {
  const exps = currentMonthTransactions(state).filter((t) => t.kind === "expense");
  if (!exps.length) return { highest: 0, lowest: 0 };
  const sorted = [...exps].sort((a, b) => a.amount - b.amount);
  return { highest: sorted[sorted.length - 1].amount, lowest: sorted[0].amount };
}

// Taux d'épargne = (income - expense) / income (ce mois)
export function savingsRate(state: StoreState): number {
  const inc = monthlyIncome(state);
  if (inc <= 0) return 0;
  const exp = monthlyExpensesTotal(state);
  return Math.max(0, (inc - exp) / inc);
}
