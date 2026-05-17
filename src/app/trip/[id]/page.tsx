"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ItineraryView from "@/components/ItineraryView";
import { getItinerary } from "@/lib/api";
import type { Itinerary } from "@/lib/types";

export default function TripDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    getItinerary(id)
      .then(setItinerary)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-roxo border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !itinerary) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-muted-foreground mb-4">Roteiro não encontrado.</p>
        <Link href="/my-trips" className="text-roxo font-medium hover:underline">
          Voltar aos roteiros
        </Link>
      </div>
    );
  }

  return (
    <ItineraryView
      itinerary={itinerary}
      onRestart={() => (window.location.href = "/planner")}
    />
  );
}
