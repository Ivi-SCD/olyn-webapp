"use client";

import { CalendarDays } from "lucide-react";
import type { DaySchedule } from "@/lib/types";

const WEEKDAY_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTH_SHORT = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];

function TimeSelect({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  const hours = Array.from({ length: 19 }, (_, i) => {
    const h = i + 6;
    return `${String(h).padStart(2, "0")}:00`;
  });
  return (
    <div className="flex-1">
      <span className="text-xs text-muted-foreground block mb-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-secondary rounded-lg px-3 py-2 text-sm font-medium text-grafite border-none outline-none cursor-pointer"
      >
        {hours.map((h) => (
          <option key={h} value={h}>{h}</option>
        ))}
      </select>
    </div>
  );
}

export default function StepDates({
  startDate,
  numDays,
  daySchedules,
  onStartDateChange,
  onDayScheduleChange,
}: {
  startDate: string;
  numDays: number;
  daySchedules: DaySchedule[];
  onStartDateChange: (v: string) => void;
  onDayScheduleChange: (idx: number, field: "start_time" | "end_time", value: string) => void;
}) {
  const endDate = (() => {
    const d = new Date(startDate + "T12:00:00");
    d.setDate(d.getDate() + numDays - 1);
    return d;
  })();

  const formatDate = (d: Date) => {
    return `${WEEKDAY_SHORT[d.getDay()]}, ${d.getDate()} de ${MONTH_SHORT[d.getMonth()]}`;
  };

  return (
    <div className="space-y-5">
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center gap-3 mb-3">
          <CalendarDays size={18} className="text-roxo" />
          <span className="text-sm font-medium text-grafite">Data de chegada</span>
        </div>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="w-full text-lg font-semibold text-grafite bg-transparent outline-none"
        />
        <p className="text-xs text-muted-foreground mt-2">
          {formatDate(new Date(startDate + "T12:00:00"))} — {formatDate(endDate)} ({numDays} {numDays === 1 ? "dia" : "dias"})
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-grafite">Tempo livre por dia</p>
        {daySchedules.map((day, idx) => {
          const d = new Date(day.date + "T12:00:00");
          return (
            <div key={idx} className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs font-semibold text-roxo mb-3">
                Dia {idx + 1} · {formatDate(d)}
              </p>
              <div className="flex gap-3">
                <TimeSelect
                  value={day.start_time}
                  onChange={(v) => onDayScheduleChange(idx, "start_time", v)}
                  label="Início"
                />
                <div className="flex items-end pb-2 text-muted-foreground">—</div>
                <TimeSelect
                  value={day.end_time}
                  onChange={(v) => onDayScheduleChange(idx, "end_time", v)}
                  label="Fim"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
