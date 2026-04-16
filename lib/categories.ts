import type { CategoryPreset } from "./types";

// Catégories disponibles. Utilisées comme référence pour les budgets
// et lors de l'ajout d'une transaction.
export const CATEGORY_PRESETS: CategoryPreset[] = [
  // Dépenses
  { id: "home", name: "Maison", icon: "Home", tint: "bg-surface-blush", accent: "text-accent-rose", kind: "expense" },
  { id: "food", name: "Alimentation", icon: "UtensilsCrossed", tint: "bg-surface-cream", accent: "text-accent-amber", kind: "expense" },
  { id: "shopping", name: "Shopping", icon: "ShoppingBag", tint: "bg-surface-cream", accent: "text-accent-amber", kind: "expense" },
  { id: "transport", name: "Transport", icon: "Car", tint: "bg-surface-lilac", accent: "text-accent-violet", kind: "expense" },
  { id: "travel", name: "Voyages", icon: "Plane", tint: "bg-surface-lilac", accent: "text-accent-purple", kind: "expense" },
  { id: "health", name: "Santé", icon: "Heart", tint: "bg-surface-blush", accent: "text-accent-pink", kind: "expense" },
  { id: "leisure", name: "Loisirs", icon: "Ticket", tint: "bg-surface-blush", accent: "text-accent-rose", kind: "expense" },
  { id: "subscriptions", name: "Abonnements", icon: "Tv", tint: "bg-surface-lilac", accent: "text-accent-purple", kind: "expense" },
  { id: "education", name: "Éducation", icon: "GraduationCap", tint: "bg-surface-lilac", accent: "text-accent-purple", kind: "expense" },
  { id: "other_exp", name: "Autres dépenses", icon: "Circle", tint: "bg-surface-lilac", accent: "text-accent-purple", kind: "expense" },

  // Revenus
  { id: "salary", name: "Salaire", icon: "Wallet", tint: "bg-surface-lilac", accent: "text-accent-purple", kind: "income" },
  { id: "freelance", name: "Freelance", icon: "Briefcase", tint: "bg-surface-blush", accent: "text-accent-rose", kind: "income" },
  { id: "invest", name: "Investissements", icon: "TrendingUp", tint: "bg-surface-lilac", accent: "text-accent-violet", kind: "income" },
  { id: "gift", name: "Cadeau", icon: "Gift", tint: "bg-surface-blush", accent: "text-accent-pink", kind: "income" },
  { id: "other_inc", name: "Autres revenus", icon: "Sparkles", tint: "bg-surface-cream", accent: "text-accent-amber", kind: "income" },
];

export function getCategory(id: string): CategoryPreset {
  return (
    CATEGORY_PRESETS.find((c) => c.id === id) ?? {
      id,
      name: id,
      icon: "Circle",
      tint: "bg-surface-lilac",
      accent: "text-accent-purple",
      kind: "both",
    }
  );
}
