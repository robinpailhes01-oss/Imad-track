"use client";

import { useState } from "react";
import { Field, GhostButton, Input, PrimaryButton, Sheet } from "../Sheet";
import { IconBadge } from "../ui";
import { CATEGORY_PRESETS } from "@/lib/categories";
import { useStore } from "@/lib/store";
import type { TransactionKind } from "@/lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
  defaultKind?: TransactionKind;
};

export function AddTransactionSheet({
  open,
  onClose,
  defaultKind = "expense",
}: Props) {
  const { addTransaction } = useStore();
  const [kind, setKind] = useState<TransactionKind>(defaultKind);
  const [amount, setAmount] = useState("");
  const [label, setLabel] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [date, setDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [error, setError] = useState<string | null>(null);

  const categories = CATEGORY_PRESETS.filter(
    (c) => c.kind === kind || c.kind === "both"
  );

  function reset() {
    setAmount("");
    setLabel("");
    setCategoryId("");
    setDate(new Date().toISOString().slice(0, 10));
    setError(null);
  }

  function submit() {
    const a = Number(amount.replace(",", "."));
    if (!a || a <= 0) {
      setError("Entre un montant supérieur à 0");
      return;
    }
    if (!categoryId) {
      setError("Choisis une catégorie");
      return;
    }
    addTransaction({
      kind,
      amount: a,
      label: label.trim(),
      categoryId,
      date,
    });
    reset();
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title="Nouvelle transaction">
      {/* Toggle kind */}
      <div className="flex rounded-2xl bg-ink/5 p-1">
        {(["expense", "income"] as const).map((k) => (
          <button
            key={k}
            onClick={() => {
              setKind(k);
              setCategoryId("");
            }}
            className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${
              kind === k ? "bg-white text-ink shadow-card" : "text-ink-muted"
            }`}
          >
            {k === "expense" ? "Dépense" : "Revenu"}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        <Field label="Montant">
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

        <Field label="Libellé (optionnel)">
          <Input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder={kind === "expense" ? "Ex. Courses Carrefour" : "Ex. Salaire"}
          />
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

        <Field label="Date">
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Field>

        {error ? (
          <p className="rounded-xl bg-rose-50 px-3 py-2 text-[11px] font-semibold text-rose-600">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-2 pt-2">
          <PrimaryButton onClick={submit}>
            {kind === "expense" ? "Ajouter la dépense" : "Ajouter le revenu"}
          </PrimaryButton>
          <GhostButton
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Annuler
          </GhostButton>
        </div>
      </div>
    </Sheet>
  );
}
