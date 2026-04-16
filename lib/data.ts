// Seed data for the Zyric finance tracker.
// Centralized here so each view references the same source of truth.

export type Category = {
  id: string;
  name: string;
  icon: string; // lucide icon name
  tint: string; // tailwind bg
  accent: string; // tailwind text
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
    transactions: 74,
    subtitle: "74 transactions ce mois",
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "ShoppingBag",
    tint: "bg-surface-cream",
    accent: "text-accent-amber",
    transactions: 42,
    subtitle: "42 transactions ce mois",
  },
  {
    id: "travel",
    name: "Voyages",
    icon: "Plane",
    tint: "bg-surface-lilac",
    accent: "text-accent-purple",
    transactions: 12,
    subtitle: "50 destinations explorées",
  },
  {
    id: "work",
    name: "Travail",
    icon: "Briefcase",
    tint: "bg-surface-lilac",
    accent: "text-accent-violet",
    transactions: 31,
    subtitle: "100 projets terminés",
  },
  {
    id: "fitness",
    name: "Fitness",
    icon: "Dumbbell",
    tint: "bg-surface-blush",
    accent: "text-accent-pink",
    transactions: 18,
    subtitle: "18 séances payées",
  },
];

export type BudgetCategory = {
  id: string;
  name: string;
  icon: string;
  tint: string;
  accent: string;
  amount: number; // budget
  spent: number;
};

export const budgets: BudgetCategory[] = [
  {
    id: "rent",
    name: "Loyer",
    icon: "Home",
    tint: "bg-surface-blush",
    accent: "text-accent-rose",
    amount: 350,
    spent: 350,
  },
  {
    id: "education",
    name: "Éducation",
    icon: "GraduationCap",
    tint: "bg-surface-lilac",
    accent: "text-accent-purple",
    amount: 220,
    spent: 207,
  },
  {
    id: "groceries",
    name: "Courses",
    icon: "ShoppingCart",
    tint: "bg-surface-cream",
    accent: "text-accent-amber",
    amount: 480,
    spent: 312,
  },
  {
    id: "transport",
    name: "Transport",
    icon: "Car",
    tint: "bg-surface-lilac",
    accent: "text-accent-violet",
    amount: 180,
    spent: 96,
  },
  {
    id: "leisure",
    name: "Loisirs",
    icon: "Ticket",
    tint: "bg-surface-blush",
    accent: "text-accent-pink",
    amount: 140,
    spent: 82,
  },
];

export type Transaction = {
  id: string;
  label: string;
  merchant: string;
  amount: number; // negative = expense, positive = income
  date: string;
  icon: string;
  tint: string;
  accent: string;
};

export const recentTransactions: Transaction[] = [
  {
    id: "t1",
    label: "Salaire d'avril",
    merchant: "Acme SAS",
    amount: 2841.29,
    date: "12 avr.",
    icon: "Wallet",
    tint: "bg-surface-lilac",
    accent: "text-accent-purple",
  },
  {
    id: "t2",
    label: "Starbucks",
    merchant: "Café du matin",
    amount: -6.5,
    date: "12 avr.",
    icon: "Coffee",
    tint: "bg-surface-cream",
    accent: "text-accent-amber",
  },
  {
    id: "t3",
    label: "Apple Store",
    merchant: "Accessoires",
    amount: -129.99,
    date: "11 avr.",
    icon: "Smartphone",
    tint: "bg-surface-lilac",
    accent: "text-accent-violet",
  },
  {
    id: "t4",
    label: "Carrefour",
    merchant: "Courses de la semaine",
    amount: -82.4,
    date: "10 avr.",
    icon: "ShoppingCart",
    tint: "bg-surface-cream",
    accent: "text-accent-amber",
  },
  {
    id: "t5",
    label: "Freelance Studio",
    merchant: "Mission UI",
    amount: 3317.0,
    date: "8 avr.",
    icon: "Briefcase",
    tint: "bg-surface-blush",
    accent: "text-accent-rose",
  },
  {
    id: "t6",
    label: "Netflix",
    merchant: "Abonnement",
    amount: -13.49,
    date: "7 avr.",
    icon: "Tv",
    tint: "bg-surface-blush",
    accent: "text-accent-pink",
  },
];

// Monthly expenses (bar chart) – values in €
export const monthlyExpenses = [
  { month: "J", value: 620 },
  { month: "F", value: 830 },
  { month: "M", value: 940 },
  { month: "A", value: 1100 },
  { month: "M", value: 1472 },
  { month: "J", value: 1380 },
  { month: "J", value: 1210 },
  { month: "A", value: 990 },
  { month: "S", value: 1170 },
  { month: "O", value: 1320 },
  { month: "N", value: 870 },
  { month: "D", value: 1040 },
];

// Daily net worth (line chart)
export const netWorthSeries = [
  { day: "Jan 11", value: 6420 },
  { day: "Jan 14", value: 6640 },
  { day: "Jan 16", value: 6580 },
  { day: "Jan 19", value: 6880 },
  { day: "Jan 21", value: 6720 },
  { day: "Jan 26", value: 7020 },
  { day: "Feb 01", value: 6980 },
  { day: "Feb 06", value: 7154.87 },
];

// Income breakdown
export const incomeBreakdown = [
  { name: "Salaire mensuel", value: 2841.29, color: "#8B5CF6" },
  { name: "Business", value: 3317.0, color: "#F472B6" },
  { name: "Investissements", value: 2267.92, color: "#A78BFA" },
];

// Overview numbers
export const overview = {
  availableBalance: 689.21,
  dailyAverage: 34.78,
  spent: 510.79,
  budgetCeiling: 1200,
  expensesMonth: 1472.74,
  expensesDelta: 2.5,
  netWorth: 7154.87,
  netWorthDelta: -1.4,
  highestExpense: 421.52,
  highestExpenseDelta: 4.59,
  lowestExpense: 74.1,
  incomeMonth: 8427.64,
  savingsRate: 0.66,
  goal: {
    title: "Vacances d'été",
    progress: 0.55,
    target: 2500,
    saved: 1380,
    deadline: "Mar 2026",
    started: "Jan 2026",
  },
};
