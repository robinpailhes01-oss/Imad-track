"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { Card, IconBadge, SectionTitle } from "@/components/ui";
import { ChevronRight, Download, RotateCcw } from "lucide-react";
import { useStore } from "@/lib/store";

const settings = [
  {
    group: "Profil",
    items: [
      { icon: "User", label: "Informations personnelles", hint: "À compléter" },
      { icon: "CreditCard", label: "Comptes bancaires", hint: "Aucun compte connecté" },
      { icon: "Target", label: "Objectifs d'épargne", hint: "Gérer depuis l'accueil" },
    ],
  },
  {
    group: "Préférences",
    items: [
      { icon: "Globe", label: "Devise", hint: "Euro (€)" },
      { icon: "Moon", label: "Apparence", hint: "Système" },
      { icon: "BellRing", label: "Notifications", hint: "Par défaut" },
    ],
  },
];

export default function AccountPage() {
  const { state, reset } = useStore();
  const [confirming, setConfirming] = useState(false);

  const txCount = state.transactions.length;
  const budgetCount = state.budgets.length;
  const goalCount = state.goals.length;

  function exportCSV() {
    const headers = ["id", "date", "kind", "amount", "categoryId", "label"];
    const rows = state.transactions.map((t) =>
      [t.id, t.date, t.kind, t.amount, t.categoryId, (t.label ?? "").replace(/,/g, " ")].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zyric-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Shell>
      <div className="flex flex-col gap-4">
        <Card className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pill-gradient text-3xl font-extrabold text-white shadow-pop">
            Z
          </div>
          <h2 className="mt-4 font-display text-lg font-bold text-ink">
            Mon compte
          </h2>
          <p className="text-[11px] text-ink-muted">Données stockées localement</p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <Stat label="Transactions" value={String(txCount)} />
            <Stat label="Budgets" value={String(budgetCount)} />
            <Stat label="Objectifs" value={String(goalCount)} />
          </div>
        </Card>

        {settings.map((section) => (
          <Card key={section.group}>
            <SectionTitle title={section.group} />
            <ul className="mt-3 divide-y divide-ink/5">
              {section.items.map((item) => (
                <li key={item.label}>
                  <button className="flex w-full items-center justify-between py-3 text-left">
                    <div className="flex items-center gap-3">
                      <IconBadge
                        name={item.icon}
                        tint="bg-surface-lilac"
                        accent="text-accent-purple"
                        size={38}
                      />
                      <div>
                        <p className="font-display text-sm font-semibold text-ink">
                          {item.label}
                        </p>
                        <p className="text-[11px] text-ink-muted">
                          {item.hint}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={14}
                      strokeWidth={2.5}
                      className="text-ink-muted"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        ))}

        {/* Données */}
        <Card>
          <SectionTitle title="Données" />
          <div className="mt-3 space-y-2">
            <button
              onClick={exportCSV}
              disabled={txCount === 0}
              className="flex w-full items-center justify-between rounded-2xl border border-ink/10 bg-white p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <IconBadge name="Download" tint="bg-surface-lilac" accent="text-accent-purple" size={38} />
                <div>
                  <p className="font-display text-sm font-semibold text-ink">
                    Exporter en CSV
                  </p>
                  <p className="text-[11px] text-ink-muted">
                    {txCount ? `${txCount} transactions` : "Aucune donnée"}
                  </p>
                </div>
              </div>
              <Download size={14} className="text-ink-muted" />
            </button>

            <button
              onClick={() => {
                if (confirming) {
                  reset();
                  setConfirming(false);
                } else {
                  setConfirming(true);
                  setTimeout(() => setConfirming(false), 4000);
                }
              }}
              className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left transition ${
                confirming
                  ? "border-rose-300 bg-rose-50"
                  : "border-ink/10 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <IconBadge name="RotateCcw" tint="bg-surface-blush" accent="text-accent-rose" size={38} />
                <div>
                  <p className="font-display text-sm font-semibold text-ink">
                    {confirming ? "Confirmer la réinitialisation ?" : "Tout réinitialiser"}
                  </p>
                  <p className="text-[11px] text-ink-muted">
                    {confirming ? "Cette action est irréversible" : "Supprime toutes les données"}
                  </p>
                </div>
              </div>
              <RotateCcw size={14} className={confirming ? "text-rose-500" : "text-ink-muted"} />
            </button>
          </div>
        </Card>
      </div>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-lilac px-2 py-3">
      <p className="text-[10px] uppercase tracking-wider text-ink-muted">
        {label}
      </p>
      <p className="font-display text-xs font-bold text-ink">{value}</p>
    </div>
  );
}
