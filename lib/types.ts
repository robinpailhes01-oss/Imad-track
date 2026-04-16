// Types partagés pour le store et les vues.

export type TransactionKind = "income" | "expense";

export type Transaction = {
  id: string;
  kind: TransactionKind;
  amount: number; // toujours positif, le signe est déduit du `kind`
  categoryId: string;
  label: string;
  date: string; // ISO (YYYY-MM-DD)
  createdAt: number; // timestamp
};

export type Budget = {
  id: string;
  name: string;
  icon: string;
  tint: string;
  accent: string;
  amount: number; // budget mensuel
  categoryId: string; // lié à une catégorie pour calculer le spent
};

export type Goal = {
  id: string;
  title: string;
  target: number;
  saved: number;
  deadline: string; // libre : "Mar 2026" ou ""
  started: string;
};

export type StoreState = {
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
};

export type CategoryPreset = {
  id: string;
  name: string;
  icon: string;
  tint: string;
  accent: string;
  kind: TransactionKind | "both";
};
