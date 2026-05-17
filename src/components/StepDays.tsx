"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

export default function StepDays({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const quickOptions = [1, 2, 3, 5, 7, 14];

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => onChange(Math.max(1, value - 1))}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-roxo/30 transition-colors"
        >
          <Minus size={16} className="text-grafite" />
        </button>
        <div className="text-center min-w-[80px]">
          <span className="text-4xl font-black text-roxo">{value}</span>
          <p className="text-xs text-muted-foreground mt-0.5">
            {value === 1 ? "dia" : "dias"}
          </p>
        </div>
        <button
          onClick={() => onChange(Math.min(30, value + 1))}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-roxo/30 transition-colors"
        >
          <Plus size={16} className="text-grafite" />
        </button>
      </div>

      <p className="text-xs text-muted-foreground text-center mb-4">
        Atalhos
      </p>
      <div className="grid grid-cols-3 gap-2">
        {quickOptions.map((n) => (
          <motion.button
            key={n}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(n)}
            className={`py-3 rounded-xl font-semibold text-sm transition-all ${
              value === n
                ? "bg-roxo text-white shadow-lg shadow-roxo/20"
                : "bg-card text-grafite border border-border hover:border-roxo/30"
            }`}
          >
            {n} {n === 1 ? "dia" : "dias"}
          </motion.button>
        ))}
      </div>

      <p className="text-center text-muted-foreground text-sm mt-5">
        {value === 1 ? "1 dia" : `${value} dias`} explorando Olinda
      </p>
    </div>
  );
}
