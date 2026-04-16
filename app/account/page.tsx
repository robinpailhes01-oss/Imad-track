import { Shell } from "@/components/Shell";
import { Card, IconBadge, SectionTitle } from "@/components/ui";
import { ChevronRight } from "lucide-react";

const settings = [
  {
    group: "Profil",
    items: [
      { icon: "User", label: "Informations personnelles", hint: "Nom, email, téléphone" },
      { icon: "CreditCard", label: "Comptes bancaires", hint: "3 comptes connectés" },
      { icon: "Target", label: "Objectifs d'épargne", hint: "2 actifs" },
    ],
  },
  {
    group: "Préférences",
    items: [
      { icon: "Globe", label: "Devise", hint: "Euro (€)" },
      { icon: "Moon", label: "Apparence", hint: "Système" },
      { icon: "BellRing", label: "Notifications", hint: "Résumé hebdo activé" },
    ],
  },
  {
    group: "Sécurité",
    items: [
      { icon: "Lock", label: "Mot de passe", hint: "Modifié il y a 2 mois" },
      { icon: "Shield", label: "Authentification à 2 facteurs", hint: "Activée" },
      { icon: "Download", label: "Exporter mes données", hint: "CSV, PDF" },
    ],
  },
];

export default function AccountPage() {
  return (
    <Shell>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <section className="lg:col-span-1">
          <Card className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pill-gradient text-3xl font-extrabold text-white shadow-pop">
              IM
            </div>
            <h2 className="mt-4 font-display text-lg font-bold text-ink">
              Imad Mostahid
            </h2>
            <p className="text-xs text-ink-muted">imad@zyric.app</p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <Stat label="Compte" value="Premium" />
              <Stat label="Depuis" value="2024" />
              <Stat label="Score" value="A+" />
            </div>
            <button className="mt-5 h-11 w-full rounded-full bg-ink text-sm font-semibold text-white shadow-soft">
              Modifier le profil
            </button>
          </Card>
        </section>

        <section className="lg:col-span-2">
          <div className="grid gap-5">
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
                            size={40}
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
                          size={16}
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
        </section>
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
      <p className="font-display text-sm font-bold text-ink">{value}</p>
    </div>
  );
}
