"use client";

import { usePathname, useRouter } from "next/navigation";
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
    <div className="min-h-screen bg-brand-gradient">
      {/* Desktop frame */}
      <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-4 pb-28 pt-6 sm:px-8 lg:px-10">
        <TopBar />
        <main className="mt-6 flex-1">{children}</main>
      </div>

      {/* Floating bottom nav */}
      <nav
        className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-[min(520px,94%)] items-center justify-between rounded-full border border-white/60 bg-white/85 px-3 py-2 shadow-pop backdrop-blur-xl"
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
              className={`flex flex-1 flex-col items-center gap-1 rounded-full px-3 py-2 text-[11px] font-medium transition-all ${
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
  );
}

function TopBar() {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-card">
          <span className="bg-pill-gradient bg-clip-text font-display text-xl font-extrabold text-transparent">
            Z
          </span>
        </div>
        <div>
          <p className="text-xs font-medium text-ink-muted">Bienvenue</p>
          <p className="font-display text-base font-bold text-ink">
            Imad · Avril 2026
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          aria-label="Notifications"
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-ink shadow-card transition hover:-translate-y-0.5"
        >
          <Bell size={18} strokeWidth={2} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent-pink" />
        </button>
        <button
          onClick={() => router.push("/budget")}
          className="flex h-11 items-center gap-2 rounded-2xl bg-ink px-4 text-sm font-semibold text-white shadow-pop transition hover:-translate-y-0.5"
        >
          <Plus size={16} strokeWidth={2.5} />
          Ajouter
        </button>
      </div>
    </header>
  );
}
