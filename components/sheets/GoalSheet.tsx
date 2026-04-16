"use client";

import { useEffect, useState } from "react";
import { Field, GhostButton, Input, PrimaryButton, Sheet } from "../Sheet";
import { useStore } from "@/lib/store";
import type { Goal } from "@/lib/types";
import { Trash2 } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  goal?: Goal | null;
};

export function GoalSheet({ open, onClose, goal }: Props) {
  const { upsertGoal, deleteGoal } = useStore();
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (goal) {
      setTitle(goal.title);
      setTarget(String(goal.target));
      setSaved(String(goal.saved));
      setDeadline(goal.deadline);
    } else {
      setTitle("");
      setTarget("");
      setSaved("0");
      setDeadline("");
    }
    setError(null);
  }, [goal, open]);

  function submit() {
    if (!title.trim()) return setError("Donne un nom à l'objectif");
    const t = Number(target.replace(",", "."));
    if (!t || t <= 0) return setError("Objectif supérieur à 0");
    const s = Math.max(0, Number(saved.replace(",", ".")) || 0);

    const today = new Intl.DateTimeFormat("fr-FR", {
      month: "short",
      year: "numeric",
    }).format(new Date());

    upsertGoal({
      id: goal?.id,
      title: title.trim(),
      target: t,
      saved: s,
      deadline: deadline.trim() || "—",
      started: goal?.started ?? today,
    });
    onClose();
  }

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={goal ? "Modifier l'objectif" : "Nouvel objectif"}
    >
      <div className="space-y-4">
        <Field label="Nom">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex. Vacances d'été"
            autoFocus
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Objectif">
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-display text-sm font-bold text-ink-muted">
                €
              </span>
              <Input
                type="text"
                inputMode="decimal"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="0,00"
                className="pl-8"
              />
            </div>
          </Field>
          <Field label="Déjà économisé">
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-display text-sm font-bold text-ink-muted">
                €
              </span>
              <Input
                type="text"
                inputMode="decimal"
                value={saved}
                onChange={(e) => setSaved(e.target.value)}
                placeholder="0,00"
                className="pl-8"
              />
            </div>
          </Field>
        </div>

        <Field label="Échéance (libre)" hint="Ex. « Mar 2026 » ou laisser vide.">
          <Input
            type="text"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="Mar 2026"
          />
        </Field>

        {error ? (
          <p className="rounded-xl bg-rose-50 px-3 py-2 text-[11px] font-semibold text-rose-600">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-2 pt-2">
          <PrimaryButton onClick={submit}>
            {goal ? "Mettre à jour" : "Créer l'objectif"}
          </PrimaryButton>
          {goal ? (
            <GhostButton
              onClick={() => {
                deleteGoal(goal.id);
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
