import type { OnboardingData, OnboardingResponse, Itinerary } from "./types";

const BASE = "/api/v1";

export async function submitOnboarding(
  data: OnboardingData
): Promise<OnboardingResponse> {
  const res = await fetch(`${BASE}/onboarding`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function generateItinerary(
  sessionId: string
): Promise<Itinerary> {
  const res = await fetch(`${BASE}/itineraries/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getItinerary(id: string): Promise<Itinerary> {
  const res = await fetch(`${BASE}/itineraries/${id}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export interface ItinerarySummary {
  id: string;
  title: string;
  num_days: number;
  total_stops: number;
  created_at: string;
}

export async function listItineraries(): Promise<ItinerarySummary[]> {
  const res = await fetch(`${BASE}/itineraries`);
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.itineraries;
}

export async function deleteItinerary(id: string): Promise<void> {
  const res = await fetch(`${BASE}/itineraries/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
}

export async function updateItineraryTitle(
  id: string,
  title: string
): Promise<Itinerary> {
  const res = await fetch(`${BASE}/itineraries/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export interface TourGuide {
  id: string;
  name: string;
  bio: string | null;
  avatar_url: string | null;
  rating: number;
  total_reviews: number;
  total_tours: number;
  languages: string[] | null;
  specialties: string[] | null;
  hourly_rate: number;
  is_available: boolean;
  verified: boolean;
  whatsapp: string | null;
  instagram: string | null;
  featured_places: string[] | null;
  response_time_minutes: number;
}

export async function listGuides(): Promise<TourGuide[]> {
  const res = await fetch(`${BASE}/guides`);
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.guides;
}

export async function seedGuides(): Promise<void> {
  await fetch(`${BASE}/guides/seed`, { method: "POST" });
}
