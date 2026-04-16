# Zyric — Finance Tracker

Application de suivi de finances premium dans un style clair, inspirée d'un
design app mobile (balance, objectifs, statistiques).

![Stack](https://img.shields.io/badge/Next.js-14-black) ![Stack](https://img.shields.io/badge/React-18-149ECA) ![Stack](https://img.shields.io/badge/Tailwind-3-38BDF8) ![Stack](https://img.shields.io/badge/TypeScript-5-3178C6)

## Aperçu

Quatre vues principales accessibles depuis la barre de navigation flottante :

- **Accueil** : Solde disponible, objectif en cours, dépenses mensuelles
  (histogramme), activité, transactions récentes.
- **Rapports** : Valeur nette (aire), dépenses max / min, répartition des
  revenus (donut), insights automatiques.
- **Budget** : Revenus du mois, répartition (salaire, business, invest.),
  budget global + budget par catégorie avec barres de progression.
- **Compte** : Profil, préférences, sécurité.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** avec design system custom (palette pastel, radius 4xl/5xl,
  ombres `card` / `soft` / `pop`)
- **Recharts** pour toutes les visualisations
- **lucide-react** pour les icônes

## Démarrer

```bash
npm install
npm run dev          # dev mode → http://localhost:3000
npm run build        # build de production
npm start            # serveur de production
```

## Structure

```
app/
  layout.tsx         Root layout + fonts + gradient
  page.tsx           Vue Accueil
  reports/page.tsx   Vue Rapports
  budget/page.tsx    Vue Budget
  account/page.tsx   Vue Compte
components/
  Shell.tsx          Top bar + bottom nav flottante
  ui.tsx             Card, Money, Chip, ProgressBar, IconBadge…
  Icon.tsx           Proxy lucide dynamique
  charts/
    ExpensesBarChart.tsx
    NetWorthChart.tsx
    IncomeDonut.tsx
    SportActivityChart.tsx
lib/
  data.ts            Seed data (catégories, budgets, transactions, séries)
```

## Design system

| Token        | Usage                                    |
| ------------ | ---------------------------------------- |
| `ink`        | Texte principal (#0F0B1E)                |
| `ink-muted`  | Texte secondaire                         |
| `paper`      | Fond global                              |
| `surface-*`  | Fonds de badges (lilac, blush, cream)    |
| `accent-*`   | Couleurs d'accent (pink, rose, purple…)  |
| `brand-gradient` / `hero-gradient` | Fonds premium         |
| `pill-gradient` | CTA gradient violet → rose             |

Les chiffres utilisent `tabular-nums` et la police d'affichage
`Plus Jakarta Sans` pour un rendu « premium ».

## Notes

- Les données sont **fictives** (voir `lib/data.ts`). Brancher une source
  réelle (API, DB) est trivial : chaque vue lit uniquement depuis ce fichier.
- L'app est **responsive** : la grille passe d'une colonne en mobile à 3
  colonnes en desktop (layout 2/3 + 1/3).
