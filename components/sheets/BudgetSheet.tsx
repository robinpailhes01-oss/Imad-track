"use client";

import { useState, useEffect } from "react";
import { Field, GhostButton, Input, PrimaryButton, Sheet } from "../Sheet";
import { IconBadge } from "../ui";
import { CATEGORY_PRESETS, getCategory } from "@/lib/categories";
import { useStore } from "@/lib/store";
import type { Budget } from "@/lib/types";
import { Trash2 } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  budget?: Budget | null;
};

export function BudgetSheet({ open, onClose, budget }: Props) {
  const { addBudget, updateBudget, deleteBudget } = useStore();
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (budget) {
      setAmount(String(budget.amount));
      setCategoryId(budget.categoryId);
    } else {
      setAmount("");
      setCategoryId("");
    }
    setError(null);
  }, [budget, open]);

  const categories = CATEGORY_PRESETS.filter(
    (c) => c.kind === "expense" || c.kind === "both"
  );

  function submit() {
    const a = Number(amount.replace(",", "."));
    if (!a || a <= 0) return setError("Entre un montant supérieur à 0");
    if (!categoryId) return setError("Choisis une catégorie");
    const cat = getCategory(categoryId);
    if (budget) {
      updateBudget({
        ...budget,
        amount: a,
        categoryId,
        name: cat.name,
        icon: cat.icon,
        tint: cat.tint,
        accent: cat.accent,
      });
    } else {
      addBudget({
        amount: a,
        categoryId,
        name: cat.name,
        icon: cat.icon,
        tint: cat.tint,
        accent: cat.accent,
      });
    }
    onClose();
  }

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={budget ? "Modifier le budget" : "Nouveau budget"}
    >
      <div className="space-y-4">
        <Field label="Budget mensuel">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-display text-sm font-bold text-ink-muted">
              €
            </span>
            <Input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              className="pl-8 text-lg"
              autoFocus
            />
          </div>
        </Field>

        <Field label="Catégorie">
          <div className="grid grid-cols-3 gap-2">
            {categories.map((c) => {
              const active = c.id === categoryId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoryId(c.id)}
                  className={`flex flex-col items-center gap-1.5 rounded-2xl border p-2 text-[11px] font-semibold transition ${
                    active
                      ? "border-ink bg-ink text-white shadow-soft"
                      : "border-ink/10 bg-white text-ink hover:border-ink/30"
                  }`}
                >
                  <IconBadge
                    name={c.icon}
                    tint={active ? "bg-white/10" : c.tint}
                    accent={active ? "text-white" : c.accent}
                    size={34}
                  />
                  <span className="line-clamp-1">{c.name}</span>
                </button>
              );
            })}
          </div>
        </Field>

        {error ? (
          <p className="rounded-xl bg-rose-50 px-3 py-2 text-[11px] font-semibold text-rose-600">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-2 pt-2">
          <PrimaryButton onClick={submit}>
            {budget ? "Mettre à jour" : "Créer le budget"}
          </PrimaryButton>
          {budget ? (
            <GhostButton
              onClick={() => {
                deleteBudget(budget.id);
                onClose();
              }}
              className="text-rose-500"
            >
              <Trash2 size={15} />
              Supprimer
            </GhostButton>
          ) : (
            <GhostButton onClick={onClose}>Annuler</GhostButton>
          )}
        </div>
      </div>
    </Sheet>
  );
}
