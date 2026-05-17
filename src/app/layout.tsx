import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Olyn — Roteiros com IA e Guias sob demanda em Olinda",
  description:
    "Explore Olinda com roteiros personalizados por IA e guias turisticos locais sob demanda. Celebrando os 500 anos de Olinda, PE.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
