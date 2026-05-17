"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Trash2,
  Pencil,
  Check,
  X,
  MapPin,
  Calendar,
  Route,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  listItineraries,
  deleteItinerary,
  updateItineraryTitle,
  type ItinerarySummary,
} from "@/lib/api";

export default function MyTripsPage() {
  const [trips, setTrips] = useState<ItinerarySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const data = await listItineraries();
      setTrips(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItinerary(id);
      setTrips((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
    setDeletingId(null);
  };

  const handleSaveTitle = async (id: string) => {
    if (!editTitle.trim()) return;
    try {
      await updateItineraryTitle(id, editTitle.trim());
      setTrips((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title: editTitle.trim() } : t))
      );
    } catch (err) {
      console.error(err);
    }
    setEditingId(null);
  };

  const formatDate = (iso: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 py-4 border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/">
            <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
              <ArrowLeft size={18} className="text-grafite/60" />
            </button>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-grafite">Meus Roteiros</h1>
            <p className="text-xs text-muted-foreground">
              {trips.length} {trips.length === 1 ? "roteiro salvo" : "roteiros salvos"}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-card rounded-xl border border-border animate-pulse"
              />
            ))}
          </div>
        ) : trips.length === 0 ? (
          <div className="text-center py-16">
            <MapPin size={40} className="mx-auto text-muted-foreground/40 mb-4" />
            <h2 className="text-lg font-semibold text-grafite">
              Nenhum roteiro ainda
            </h2>
            <p className="text-sm text-muted-foreground mt-1 mb-6">
              Crie seu primeiro roteiro personalizado com IA
            </p>
            <Link href="/planner">
              <Button className="bg-roxo hover:bg-roxo/90 text-white rounded-xl">
                Criar roteiro
              </Button>
            </Link>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-3">
              {trips.map((trip, idx) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-card rounded-xl border border-border p-4 relative group"
                >
                  {deletingId === trip.id ? (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-grafite">Excluir este roteiro?</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeletingId(null)}
                        >
                          Cancelar
                        </Button>
                        <Button
                          size="sm"
                          className="bg-vermelho hover:bg-vermelho/90 text-white"
                          onClick={() => handleDelete(trip.id)}
                        >
                          Excluir
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between">
                        <Link href={`/trip/${trip.id}`} className="flex-1 min-w-0">
                          {editingId === trip.id ? (
                            <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                              <input
                                autoFocus
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleSaveTitle(trip.id);
                                  if (e.key === "Escape") setEditingId(null);
                                }}
                                className="flex-1 text-sm font-semibold text-grafite bg-secondary rounded-lg px-2 py-1 outline-none border border-roxo/30"
                              />
                              <button
                                onClick={(e) => { e.preventDefault(); handleSaveTitle(trip.id); }}
                                className="text-verde hover:bg-verde/10 p-1 rounded"
                              >
                                <Check size={14} />
                              </button>
                              <button
                                onClick={(e) => { e.preventDefault(); setEditingId(null); }}
                                className="text-muted-foreground hover:bg-secondary p-1 rounded"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ) : (
                            <h3 className="font-semibold text-grafite text-sm truncate">
                              {trip.title}
                            </h3>
                          )}

                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar size={11} />
                              {trip.num_days} {trip.num_days === 1 ? "dia" : "dias"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Route size={11} />
                              {trip.total_stops} paradas
                            </span>
                            <span>{formatDate(trip.created_at)}</span>
                          </div>
                        </Link>

                        {editingId !== trip.id && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                            <button
                              onClick={() => {
                                setEditingId(trip.id);
                                setEditTitle(trip.title);
                              }}
                              className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-grafite transition-colors"
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              onClick={() => setDeletingId(trip.id)}
                              className="p-1.5 rounded-lg hover:bg-vermelho/10 text-muted-foreground hover:text-vermelho transition-colors"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
