export const INTEREST_KEYS = [
  "history",
  "art_and_culture",
  "handicrafts",
  "nature",
  "shopping",
  "gastronomy",
  "nightlife",
] as const;

export const INTEREST_LABELS: Record<string, string> = {
  history: "História",
  art_and_culture: "Arte e Cultura",
  handicrafts: "Artesanato",
  nature: "Natureza",
  shopping: "Compras",
  gastronomy: "Gastronomia",
  nightlife: "Vida Noturna",
};

export const INTEREST_COLORS: Record<string, string> = {
  history: "#C8242E",
  art_and_culture: "#E84A7F",
  handicrafts: "#C76A38",
  nature: "#3A8C5A",
  shopping: "#F5B225",
  gastronomy: "#FF7B54",
  nightlife: "#7B3FE4",
};

export const COMPANION_OPTIONS = [
  { value: "SOLO", label: "Sozinho(a)", description: "No seu próprio ritmo" },
  { value: "COUPLE", label: "Casal", description: "Roteiro romântico" },
  { value: "FAMILY", label: "Família", description: "Para todas as idades" },
  { value: "FRIENDS", label: "Amigos", description: "Aventura em grupo" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "ECONOMY", label: "Econômico", description: "Curtir gastando pouco" },
  { value: "STANDARD", label: "Normal", description: "Equilíbrio entre custo e conforto" },
  { value: "LUXURY", label: "Luxo", description: "A melhor experiência" },
] as const;

export const WEEKDAY_PT: Record<string, string> = {
  Monday: "Segunda-feira",
  Tuesday: "Terça-feira",
  Wednesday: "Quarta-feira",
  Thursday: "Quinta-feira",
  Friday: "Sexta-feira",
  Saturday: "Sábado",
  Sunday: "Domingo",
};
