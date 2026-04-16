# Zyric — Finance Tracker

App de suivi de finances premium, format mobile, **entièrement
fonctionnelle** : ajout / suppression de transactions, gestion de budgets
par catégorie, objectif d'épargne, export CSV. Les données sont persistées
localement (localStorage).

![Stack](https://img.shields.io/badge/Next.js-14-black) ![Stack](https://img.shields.io/badge/React-18-149ECA) ![Stack](https://img.shields.io/badge/Tailwind-3-38BDF8) ![Stack](https://img.shields.io/badge/TypeScript-5-3178C6)

## Fonctionnalités

**Accueil**
- Solde total (calculé à partir de toutes les transactions)
- Graphique d'évolution du patrimoine sur 30 jours (aire dégradée)
- Objectif d'épargne (avec progression)
- Dépenses du mois + histogramme 12 mois glissants
- Transactions récentes avec suppression au clic

**Rapports**
- Courbe du patrimoine (même série, plus grande)
- Cartes « Dépense max » et « Dépense min » du mois en cours
- Donut de répartition des revenus (ce mois)
- Insights générés automatiquement (taux d'épargne, alerte déficit, etc.)

**Budget**
- Revenus du mois + taux d'épargne
- Mini-cards top 3 sources de revenus
- Budget global avec barre de progression
- Budgets par catégorie (CRUD complet : créer / modifier / supprimer)
- Spent calculé dynamiquement à partir des transactions de la catégorie

**Compte**
- Statistiques du store (nb transactions, budgets, objectifs)
- Export CSV des transactions
- Réinitialisation totale (double confirmation)

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** avec design system custom (palette pastel, radius
  4xl/5xl, ombres `card` / `soft` / `pop`, gradients `brand` / `hero`)
- **Recharts** pour toutes les visualisations
- **lucide-react** pour les icônes
- **localStorage** pour la persistance (clé `zyric:state:v1`)

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start
```

## Structure

```
app/
  layout.tsx              Root layout + Providers + fonts
  page.tsx                Accueil (solde + chart patrimoine + transactions)
  reports/page.tsx        Rapports (net worth, extrêmes, revenus, insights)
  budget/page.tsx         Budget (revenus, CRUD budgets, objectif)
  account/page.tsx        Compte (export, reset)
components/
  Shell.tsx               Top bar + bottom nav + cadre mobile 430px
  Providers.tsx           Enveloppe <StoreProvider>
  Sheet.tsx               Bottom sheet + Field/Input/Buttons
  Icon.tsx                Proxy lucide dynamique
  ui.tsx                  Card, Money, Chip, ProgressBar, IconBadge
  charts/
    ExpensesBarChart.tsx  Histogramme 12 mois
    NetWorthArea.tsx      Aire patrimoine (live, sous le solde)
    IncomeDonut.tsx       Donut revenus (live)
  sheets/
    AddTransactionSheet.tsx  Formulaire dépense / revenu
    BudgetSheet.tsx          CRUD budget par catégorie
    GoalSheet.tsx            CRUD objectif d'épargne
lib/
  types.ts                Transaction, Budget, Goal, StoreState
  categories.ts           Catégories préréglées (icônes + couleurs)
  store.tsx               React Context + useReducer + localStorage
  derived.ts              Sélecteurs : balance, net worth series,
                          month expenses, income breakdown, savings rate
```

## Modèle de données

```ts
type Transaction = {
  id: string;
  kind: "income" | "expense";
  amount: number;       // toujours positif, le signe vient du `kind`
  categoryId: string;   // id de CATEGORY_PRESETS
  label: string;
  date: string;         // ISO YYYY-MM-DD
  createdAt: number;
};

type Budget = { id; name; icon; tint; accent; amount; categoryId };
type Goal   = { id; title; target; saved; deadline; started };
```

Tous les chiffres affichés (solde, net worth, depenses du mois, spent par
budget, etc.) sont **dérivés** des transactions en temps réel — il n'y a
aucune valeur en dur.

## Notes

- **Mobile-first** : cadre fixe à 430 px sur fond neutre, nav flottante.
- **Persistance** : les données sont conservées dans `localStorage`. Tout
  passe par le contexte `StoreProvider` (hook `useStore`).
- **Offline ready** : aucune requête réseau requise pour utiliser l'app.
