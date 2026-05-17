"use client";

import { Slider } from "@/components/ui/slider";
import { INTEREST_KEYS, INTEREST_LABELS, INTEREST_COLORS } from "@/lib/constants";
import type { Interests } from "@/lib/types";

export default function StepInterests({
  interests,
  onChange,
}: {
  interests: Interests;
  onChange: (interests: Interests) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex justify-between text-[11px] text-muted-foreground uppercase tracking-wider px-1">
        <span>Pouco interesse</span>
        <span>Muito interesse</span>
      </div>

      {INTEREST_KEYS.map((key) => {
        const val = interests[key as keyof Interests] ?? 0.5;
        const color = INTEREST_COLORS[key];
        const pct = Math.round(val * 100);

        return (
          <div key={key} className="bg-card rounded-xl px-4 py-3.5 border border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-grafite">
                {INTEREST_LABELS[key]}
              </span>
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color, opacity: 0.3 + val * 0.7 }}
              />
            </div>
            <Slider
              value={[pct]}
              min={0}
              max={100}
              step={5}
              onValueChange={(newVal: number | readonly number[]) => {
                const n = Array.isArray(newVal) ? newVal[0] : newVal;
                onChange({ ...interests, [key]: n / 100 });
              }}
              className="[&_[data-slot=slider-range]]:bg-roxo [&_[data-slot=slider-thumb]]:border-roxo [&_[data-slot=slider-thumb]]:ring-roxo/30"
            />
          </div>
        );
      })}
    </div>
  );
}
