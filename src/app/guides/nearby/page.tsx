"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  MessageCircle,
  Navigation,
  Locate,
  Clock,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { listGuides, seedGuides, type TourGuide } from "@/lib/api";

interface NearbyGuide extends TourGuide {
  distance_km: number;
  eta_minutes: number;
}

function simulateNearbyDistance(lat: number, lng: number, guide: TourGuide): NearbyGuide {
  const seed = guide.name.length * 37 + guide.hourly_rate;
  const dist = 0.3 + (seed % 50) / 10;
  const eta = Math.round(dist * 4 + 2);
  return { ...guide, distance_km: Math.round(dist * 10) / 10, eta_minutes: eta };
}

function PulsingDot() {
  return (
    <div className="relative">
      <div className="w-4 h-4 bg-azul rounded-full" />
      <div className="absolute inset-0 w-4 h-4 bg-azul rounded-full animate-ping opacity-40" />
    </div>
  );
}

function NearbyGuideCard({
  guide,
  onSelect,
}: {
  guide: NearbyGuide;
  onSelect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card rounded-xl border border-border p-4 hover:shadow-md hover:border-verde/30 transition-all cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex gap-3">
        <div className="relative">
          <img
            src={guide.avatar_url || `https://api.dicebear.com/9.x/personas/svg?seed=${guide.name}`}
            alt={guide.name}
            className="w-12 h-12 rounded-full"
          />
          {guide.is_available && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-verde rounded-full border-2 border-card" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-grafite text-sm truncate">
              {guide.name}
            </h3>
            {guide.verified && (
              <CheckCircle2 size={12} className="text-azul flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="flex items-center gap-0.5 text-xs font-medium text-amarelo-sol">
              <Star size={10} fill="currentColor" />
              {guide.rating.toFixed(1)}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {guide.total_tours} passeios
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {guide.specialties?.slice(0, 2).map((s) => (
              <Badge key={s} variant="secondary" className="text-[10px] px-1.5 py-0">
                {s}
              </Badge>
            ))}
          </div>
        </div>

        <div className="text-right flex-shrink-0 flex flex-col items-end justify-between">
          <div className="flex items-center gap-1 text-verde">
            <Navigation size={11} />
            <span className="text-xs font-bold">{guide.distance_km} km</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock size={10} />
            <span className="text-[11px]">{guide.eta_minutes} min</span>
          </div>
          <span className="text-sm font-bold text-roxo">
            R${guide.hourly_rate.toFixed(0)}/h
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function GuideRequestModal({
  guide,
  onClose,
}: {
  guide: NearbyGuide;
  onClose: () => void;
}) {
  const [requesting, setRequesting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleRequest = () => {
    setRequesting(true);
    setTimeout(() => {
      setRequesting(false);
      setConfirmed(true);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-branco-cal w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl"
      >
        <div className="p-5">
          {confirmed ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-verde/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-verde" />
              </div>
              <h3 className="text-lg font-bold text-grafite">Solicitação enviada!</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {guide.name} recebeu sua solicitação e responde em ~{guide.response_time_minutes} min
              </p>
              {guide.whatsapp && (
                <a
                  href={`https://wa.me/${guide.whatsapp.replace(/\D/g, "")}?text=Olá ${guide.name}! Solicitei um passeio pelo Olyn. Estou próximo(a) de você!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-verde text-white font-medium text-sm"
                >
                  <MessageCircle size={15} />
                  Enviar mensagem
                </a>
              )}
              <Button variant="ghost" className="mt-3 text-sm" onClick={onClose}>
                Fechar
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={guide.avatar_url || `https://api.dicebear.com/9.x/personas/svg?seed=${guide.name}`}
                  alt={guide.name}
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-grafite">{guide.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {guide.distance_km} km de você · chega em ~{guide.eta_minutes} min
                  </p>
                </div>
              </div>

              <div className="bg-secondary rounded-xl p-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Valor por hora</span>
                  <span className="font-bold text-grafite">R$ {guide.hourly_rate.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm mt-1.5">
                  <span className="text-muted-foreground">Tempo de resposta</span>
                  <span className="font-medium text-grafite">~{guide.response_time_minutes} min</span>
                </div>
                <div className="flex justify-between text-sm mt-1.5">
                  <span className="text-muted-foreground">Especialidades</span>
                  <span className="font-medium text-grafite">{guide.specialties?.slice(0, 2).join(", ")}</span>
                </div>
              </div>

              <Button
                onClick={handleRequest}
                disabled={requesting}
                className="w-full bg-roxo hover:bg-roxo/90 text-white font-semibold h-12 rounded-xl"
              >
                {requesting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Solicitando...
                  </span>
                ) : (
                  "Solicitar guia agora"
                )}
              </Button>
              <Button variant="ghost" className="w-full mt-2 text-sm" onClick={onClose}>
                Cancelar
              </Button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function NearbyGuidesPage() {
  const [guides, setGuides] = useState<NearbyGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<NearbyGuide | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocating(false);
        },
        () => {
          setUserLocation({ lat: -8.0089, lng: -34.8553 });
          setLocating(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setUserLocation({ lat: -8.0089, lng: -34.8553 });
      setLocating(false);
    }
  }, []);

  useEffect(() => {
    if (!userLocation) return;
    loadGuides();
  }, [userLocation]);

  const loadGuides = async () => {
    try {
      await seedGuides();
      const data = await listGuides();
      const nearby = data
        .filter((g) => g.is_available)
        .map((g) => simulateNearbyDistance(userLocation!.lat, userLocation!.lng, g))
        .sort((a, b) => a.distance_km - b.distance_km);
      setGuides(nearby);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 py-4 border-b border-border sticky top-0 bg-background/90 backdrop-blur-sm z-30">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/guides">
            <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
              <ArrowLeft size={18} className="text-grafite/60" />
            </button>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-grafite">Guias Próximos</h1>
            <div className="flex items-center gap-1.5">
              <PulsingDot />
              <p className="text-xs text-muted-foreground">
                {locating ? "Obtendo localização..." : "Localização ativa"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-verde font-medium bg-verde/10 px-2.5 py-1 rounded-full">
            <Locate size={12} />
            Ao vivo
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {locating || loading ? (
          <div className="text-center py-16">
            <div className="relative inline-block mb-4">
              <MapPin size={36} className="text-roxo" />
              <div className="absolute -inset-3 border-2 border-roxo/20 rounded-full animate-ping" />
            </div>
            <p className="text-sm text-muted-foreground">
              {locating ? "Obtendo sua localização..." : "Buscando guias por perto..."}
            </p>
          </div>
        ) : guides.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Nenhum guia disponível no momento.</p>
            <Link href="/guides">
              <Button variant="ghost" className="mt-2 text-roxo">
                Ver todos os guias
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-verde/8 rounded-xl p-3 mb-5 flex items-center gap-3">
              <div className="w-8 h-8 bg-verde/15 rounded-full flex items-center justify-center flex-shrink-0">
                <Navigation size={14} className="text-verde" />
              </div>
              <div>
                <p className="text-xs font-medium text-grafite">
                  {guides.length} {guides.length === 1 ? "guia disponível" : "guias disponíveis"} agora
                </p>
                <p className="text-[11px] text-muted-foreground">
                  O mais próximo está a {guides[0].distance_km} km (~{guides[0].eta_minutes} min)
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {guides.map((guide, i) => (
                <NearbyGuideCard
                  key={guide.id}
                  guide={guide}
                  onSelect={() => setSelectedGuide(guide)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <AnimatePresence>
        {selectedGuide && (
          <GuideRequestModal
            guide={selectedGuide}
            onClose={() => setSelectedGuide(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
