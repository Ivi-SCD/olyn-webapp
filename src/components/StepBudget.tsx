"use client";

import { motion } from "framer-motion";
import { Wallet, Scale, Gem } from "lucide-react";
import { BUDGET_OPTIONS } from "@/lib/constants";

const ICONS: Record<string, React.ReactNode> = {
  ECONOMY: <Wallet size={20} />,
  STANDARD: <Scale size={20} />,
  LUXURY: <Gem size={20} />,
};

export default function StepBudget({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      {BUDGET_OPTIONS.map((opt) => {
        const selected = value === opt.value;
        return (
          <motion.button
            key={opt.value}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(opt.value)}
            className={`w-full p-5 rounded-xl text-left flex items-center gap-4 transition-all ${
              selected
                ? "bg-roxo text-white shadow-md shadow-roxo/20"
                : "bg-card border border-border hover:border-roxo/30"
            }`}
          >
            <div className={selected ? "text-white/70" : "text-roxo"}>
              {ICONS[opt.value]}
            </div>
            <div>
              <span className="font-semibold text-base block">{opt.label}</span>
              <span
                className={`text-sm ${
                  selected ? "text-white/60" : "text-muted-foreground"
                }`}
              >
                {opt.description}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
