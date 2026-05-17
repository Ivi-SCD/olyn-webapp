export type CompanionType = "SOLO" | "COUPLE" | "FAMILY" | "FRIENDS";
export type BudgetLevel = "ECONOMY" | "STANDARD" | "LUXURY";

export interface Interests {
  history: number;
  art_and_culture: number;
  handicrafts: number;
  nature: number;
  shopping: number;
  gastronomy: number;
  nightlife: number;
}

export interface DaySchedule {
  date: string;
  start_time: string;
  end_time: string;
}

export interface OnboardingData {
  num_days: number;
  start_time: string;
  end_time: string;
  start_date: string;
  end_date: string;
  companion_type: CompanionType;
  interests: Interests;
  budget: BudgetLevel;
}

export interface OnboardingResponse {
  session_id: string;
  profile_id: string;
  message: string;
}

export interface ItineraryItem {
  start_time: string;
  end_time: string;
  place_name: string;
  description: string | null;
  historical_context: string | null;
  rating: number | null;
  review_count: number | null;
  photo_url: string | null;
  additional_photo_urls: string[] | null;
  opening_hours: string[] | null;
  travel_mode: string | null;
  travel_time_minutes: number | null;
  estimated_cost: number | null;
  latitude: number | null;
  longitude: number | null;
  google_maps_url: string | null;
}

export interface ItineraryDay {
  day_number: number;
  date: string;
  weekday: string;
  items: ItineraryItem[];
}

export interface Itinerary {
  id: string;
  title: string;
  days: ItineraryDay[];
}
