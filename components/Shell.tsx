"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "./Icon";
import { Bell, Plus } from "lucide-react";

const tabs = [
  { href: "/", label: "Accueil", icon: "LayoutDashboard" },
  { href: "/reports", label: "Rapports", icon: "PieChart" },
  { href: "/budget", label: "Budget", icon: "PiggyBank" },
  { href: "/account", label: "Compte", icon: "User" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen justify-center bg-paper">
      {/* Mobile frame — visible sur desktop comme sur téléphone */}
      <div className="relative flex min-h-screen w-full max-w-[430px] flex-col bg-brand-gradient shadow-[0_30px_80px_-40px_rgba(93,55,172,0.35)]">
        <TopBar />
        <main className="flex-1 px-4 pb-32 pt-4">{children}</main>

        {/* Bottom nav */}
        <nav
          className="fixed bottom-3 left-1/2 z-50 flex w-[min(400px,92%)] -translate-x-1/2 items-center justify-between rounded-full border border-white/60 bg-white/90 px-2 py-2 shadow-pop backdrop-blur-xl"
          aria-label="Navigation principale"
        >
          {tabs.map((tab) => {
            const active =
              tab.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-1 flex-col items-center gap-0.5 rounded-full px-2 py-2 text-[10px] font-medium transition-all ${
                  active
                    ? "bg-ink text-white shadow-soft"
                    : "text-ink-muted hover:text-ink"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon name={tab.icon} size={18} strokeWidth={2} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <header className="flex items-center justify-between px-4 pt-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-card">
          <span className="bg-pill-gradient bg-clip-text font-display text-lg font-extrabold text-transparent">
            Z
          </span>
        </div>
        <div>
          <p className="text-[11px] font-medium text-ink-muted">Bienvenue</p>
          <p className="font-display text-sm font-bold text-ink">
            Nouvel utilisateur
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-ink shadow-card"
        >
          <Bell size={16} strokeWidth={2} />
        </button>
        <Link
          href="/budget"
          aria-label="Ajouter"
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-white shadow-pop"
        >
          <Plus size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </header>
  );
}
