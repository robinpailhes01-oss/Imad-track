// Seed data for the Zyric finance tracker.
// Tout est à 0 : l'app démarre vide, prête à être alimentée par l'utilisateur.

export type Category = {
  id: string;
  name: string;
  icon: string;
  tint: string;
  accent: string;
  transactions: number;
  subtitle: string;
};

export const categories: Category[] = [
  {
    id: "home",
    name: "Maison",
    icon: "Home",
    tint: "bg-surface-blush",
    accent: "text-accent-rose",
    transactions: 0,
    subtitle: "Aucune transaction",
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "ShoppingBag",
    tint: "bg-surface-cream",
    accent: "text-accent-amber",
    transactions: 0,
    subtitle: "Aucune transaction",
  },
  {
    id: "travel",
    name: "Voyages",
    icon: "Plane",
    tint: "bg-surface-lilac",
    accent: "text-accent-purple",
    transactions: 0,
    subtitle: "Aucune transaction",
  },
  {
    id: "work",
    name: "Travail",
    icon: "Briefcase",
    tint: "bg-surface-lilac",
    accent: "text-accent-violet",
    transactions: 0,
    subtitle: "Aucune transaction",
  },
];

export type BudgetCategory = {
  id: string;
  name: string;
  icon: string;
  tint: string;
  accent: string;
  amount: number;
  spent: number;
};

export const budgets: BudgetCategory[] = [
  {
    id: "rent",
    name: "Loyer",
    icon: "Home",
    tint: "bg-surface-blush",
    accent: "text-accent-rose",
    amount: 0,
    spent: 0,
  },
  {
    id: "education",
    name: "Éducation",
    icon: "GraduationCap",
    tint: "bg-surface-lilac",
    accent: "text-accent-purple",
    amount: 0,
    spent: 0,
  },
  {
    id: "groceries",
    name: "Courses",
    icon: "ShoppingCart",
    tint: "bg-surface-cream",
    accent: "text-accent-amber",
    amount: 0,
    spent: 0,
  },
  {
    id: "transport",
    name: "Transport",
    icon: "Car",
    tint: "bg-surface-lilac",
    accent: "text-accent-violet",
    amount: 0,
    spent: 0,
  },
];

export type Transaction = {
  id: string;
  label: string;
  merchant: string;
  amount: number;
  date: string;
  icon: string;
  tint: string;
  accent: string;
};

export const recentTransactions: Transaction[] = [];

// Monthly expenses (bar chart) – 12 mois à 0
export const monthlyExpenses = [
  { month: "J", value: 0 },
  { month: "F", value: 0 },
  { month: "M", value: 0 },
  { month: "A", value: 0 },
  { month: "M", value: 0 },
  { month: "J", value: 0 },
  { month: "J", value: 0 },
  { month: "A", value: 0 },
  { month: "S", value: 0 },
  { month: "O", value: 0 },
  { month: "N", value: 0 },
  { month: "D", value: 0 },
];

// Valeur nette (line chart)
export const netWorthSeries = [
  { day: "Jan 11", value: 0 },
  { day: "Jan 14", value: 0 },
  { day: "Jan 16", value: 0 },
  { day: "Jan 19", value: 0 },
  { day: "Jan 21", value: 0 },
  { day: "Jan 26", value: 0 },
  { day: "Feb 01", value: 0 },
  { day: "Feb 06", value: 0 },
];

// Revenus (donut) — valeurs à 0 (le chart affichera un anneau vide)
export const incomeBreakdown = [
  { name: "Salaire mensuel", value: 0, color: "#8B5CF6" },
  { name: "Business", value: 0, color: "#F472B6" },
  { name: "Investissements", value: 0, color: "#A78BFA" },
];

// Totaux globaux
export const overview = {
  availableBalance: 0,
  dailyAverage: 0,
  spent: 0,
  budgetCeiling: 0,
  expensesMonth: 0,
  expensesDelta: 0,
  netWorth: 0,
  netWorthDelta: 0,
  highestExpense: 0,
  highestExpenseDelta: 0,
  lowestExpense: 0,
  incomeMonth: 0,
  savingsRate: 0,
  goal: {
    title: "Aucun objectif défini",
    progress: 0,
    target: 0,
    saved: 0,
    deadline: "—",
    started: "—",
  },
};
