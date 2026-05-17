"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StepShell({
  step,
  totalSteps,
  title,
  subtitle,
  children,
  onNext,
  onBack,
  nextLabel = "Continuar",
  nextDisabled = false,
}: {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}) {
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-4 pt-4 pb-2 flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ArrowLeft size={18} className="text-grafite/60" />
          </button>
        )}
        <div className="flex-1">
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-roxo rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
        <span className="text-xs text-muted-foreground tabular-nums">
          {step + 1}/{totalSteps}
        </span>
      </header>

      <div className="flex-1 flex items-start justify-center px-4 pt-8 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-lg"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-grafite leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1.5 text-muted-foreground">{subtitle}</p>
              )}
            </div>

            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-branco-cal/80 backdrop-blur-lg border-t border-border p-4">
        <div className="max-w-lg mx-auto">
          <Button
            onClick={onNext}
            disabled={nextDisabled}
            size="lg"
            className="w-full bg-roxo hover:bg-roxo/90 text-white font-semibold text-base h-12 rounded-xl"
          >
            {nextLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
