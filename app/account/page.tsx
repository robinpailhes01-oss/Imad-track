import { Shell } from "@/components/Shell";
import { Card, IconBadge, SectionTitle } from "@/components/ui";
import { ChevronRight } from "lucide-react";

const settings = [
  {
    group: "Profil",
    items: [
      { icon: "User", label: "Informations personnelles", hint: "À compléter" },
      { icon: "CreditCard", label: "Comptes bancaires", hint: "Aucun compte connecté" },
      { icon: "Target", label: "Objectifs d'épargne", hint: "Aucun objectif" },
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
  {
    group: "Sécurité",
    items: [
      { icon: "Lock", label: "Mot de passe", hint: "Jamais modifié" },
      { icon: "Shield", label: "Authentification à 2 facteurs", hint: "Désactivée" },
      { icon: "Download", label: "Exporter mes données", hint: "CSV, PDF" },
    ],
  },
];

export default function AccountPage() {
  return (
    <Shell>
      <div className="flex flex-col gap-4">
        <Card className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pill-gradient text-3xl font-extrabold text-white shadow-pop">
            ?
          </div>
          <h2 className="mt-4 font-display text-lg font-bold text-ink">
            Nouvel utilisateur
          </h2>
          <p className="text-[11px] text-ink-muted">Complétez votre profil</p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <Stat label="Compte" value="Gratuit" />
            <Stat label="Depuis" value="—" />
            <Stat label="Score" value="—" />
          </div>
          <button className="mt-5 h-11 w-full rounded-full bg-ink text-sm font-semibold text-white shadow-soft">
            Modifier le profil
          </button>
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
