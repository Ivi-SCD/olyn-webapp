"use client";

import { motion } from "framer-motion";
import { User, Heart, Users, PartyPopper } from "lucide-react";
import { COMPANION_OPTIONS } from "@/lib/constants";

const ICONS: Record<string, React.ReactNode> = {
  SOLO: <User size={22} />,
  COUPLE: <Heart size={22} />,
  FAMILY: <Users size={22} />,
  FRIENDS: <PartyPopper size={22} />,
};

export default function StepCompanions({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {COMPANION_OPTIONS.map((opt) => {
        const selected = value === opt.value;
        return (
          <motion.button
            key={opt.value}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange(opt.value)}
            className={`p-5 rounded-xl text-left transition-all ${
              selected
                ? "bg-roxo text-white shadow-md shadow-roxo/20"
                : "bg-card border border-border hover:border-roxo/30"
            }`}
          >
            <div className={selected ? "text-white/80" : "text-roxo"}>
              {ICONS[opt.value]}
            </div>
            <span className="font-semibold text-base block mt-3">
              {opt.label}
            </span>
            <span
              className={`text-xs mt-0.5 block ${
                selected ? "text-white/60" : "text-muted-foreground"
              }`}
            >
              {opt.description}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
