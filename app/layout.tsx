import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zyric — Smart budget tracking",
  description:
    "Zyric is a premium budget & finance tracker. Track expenses, save goals, and gain financial insights effortlessly.",
};

export const viewport: Viewport = {
  themeColor: "#0F0B1E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-brand-gradient text-ink">
        {children}
      </body>
    </html>
  );
}
