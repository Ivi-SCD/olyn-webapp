"use client";

import { useState } from "react";
import StepShell from "@/components/StepShell";
import StepDays from "@/components/StepDays";
import StepDates from "@/components/StepDates";
import StepCompanions from "@/components/StepCompanions";
import StepInterests from "@/components/StepInterests";
import StepBudget from "@/components/StepBudget";
import GeneratingScreen from "@/components/GeneratingScreen";
import ItineraryView from "@/components/ItineraryView";
import { submitOnboarding, generateItinerary } from "@/lib/api";
import type {
  CompanionType,
  BudgetLevel,
  Interests,
  DaySchedule,
  Itinerary,
} from "@/lib/types";

const STEPS = [
  { title: "Quantos dias em Olinda?", subtitle: "Escolha a duração da sua viagem" },
  { title: "Quando você vem?", subtitle: "Selecione a data e o horário livre de cada dia" },
  { title: "Com quem você vem?", subtitle: "Isso nos ajuda a montar a experiência ideal" },
  { title: "O que te interessa?", subtitle: "Arraste os controles conforme seu interesse" },
  { title: "Qual seu orçamento?", subtitle: "Adaptamos as sugestões ao seu bolso" },
];

function buildDaySchedules(startDate: string, numDays: number): DaySchedule[] {
  return Array.from({ length: numDays }, (_, i) => {
    const d = new Date(startDate + "T12:00:00");
    d.setDate(d.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return { date: `${y}-${m}-${day}`, start_time: "09:00", end_time: "18:00" };
  });
}

export default function PlannerPage() {
  const [step, setStep] = useState(0);
  const [numDays, setNumDays] = useState(2);
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  });
  const [daySchedules, setDaySchedules] = useState<DaySchedule[]>(() =>
    buildDaySchedules(startDate, numDays)
  );
  const [companion, setCompanion] = useState<CompanionType>("COUPLE");
  const [interests, setInterests] = useState<Interests>({
    history: 0.7,
    art_and_culture: 0.6,
    handicrafts: 0.4,
    nature: 0.5,
    shopping: 0.3,
    gastronomy: 0.8,
    nightlife: 0.4,
  });
  const [budget, setBudget] = useState<BudgetLevel>("STANDARD");
  const [generating, setGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  const handleDaysChange = (n: number) => {
    setNumDays(n);
    setDaySchedules(buildDaySchedules(startDate, n));
  };

  const handleStartDateChange = (d: string) => {
    setStartDate(d);
    setDaySchedules(buildDaySchedules(d, numDays));
  };

  const handleDayScheduleChange = (
    idx: number,
    field: "start_time" | "end_time",
    value: string
  ) => {
    setDaySchedules((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s))
    );
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const first = daySchedules[0];
      const last = daySchedules[daySchedules.length - 1];
      const onboardRes = await submitOnboarding({
        num_days: numDays,
        start_time: first.start_time,
        end_time: last.end_time,
        start_date: first.date,
        end_date: last.date,
        companion_type: companion,
        interests,
        budget,
      });
      const result = await generateItinerary(onboardRes.session_id);
      setItinerary(result);
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar roteiro. Tente novamente.");
    } finally {
      setGenerating(false);
    }
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  if (itinerary) {
    return (
      <ItineraryView
        itinerary={itinerary}
        onRestart={() => {
          setItinerary(null);
          setStep(0);
        }}
      />
    );
  }

  if (generating) {
    return <GeneratingScreen />;
  }

  return (
    <StepShell
      step={step}
      totalSteps={STEPS.length}
      title={STEPS[step].title}
      subtitle={STEPS[step].subtitle}
      onNext={handleNext}
      onBack={step > 0 ? handleBack : undefined}
      nextLabel={step === STEPS.length - 1 ? "Gerar roteiro com IA" : "Continuar"}
    >
      {step === 0 && <StepDays value={numDays} onChange={handleDaysChange} />}
      {step === 1 && (
        <StepDates
          startDate={startDate}
          numDays={numDays}
          daySchedules={daySchedules}
          onStartDateChange={handleStartDateChange}
          onDayScheduleChange={handleDayScheduleChange}
        />
      )}
      {step === 2 && <StepCompanions value={companion} onChange={(v) => setCompanion(v as CompanionType)} />}
      {step === 3 && <StepInterests interests={interests} onChange={setInterests} />}
      {step === 4 && <StepBudget value={budget} onChange={(v) => setBudget(v as BudgetLevel)} />}
    </StepShell>
  );
}
