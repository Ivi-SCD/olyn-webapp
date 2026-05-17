"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Star,
  Navigation,
  X,
  Footprints,
  Car,
  RotateCcw,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Itinerary, ItineraryItem, ItineraryDay } from "@/lib/types";
import { WEEKDAY_PT } from "@/lib/constants";
import DynamicItineraryMap from "@/components/DynamicItineraryMap";

function TravelIndicator({ item }: { item: ItineraryItem }) {
  if (!item.travel_time_minutes || item.travel_time_minutes <= 0) return null;
  const Icon = item.travel_mode === "WALKING" ? Footprints : Car;
  return (
    <div className="flex items-center gap-2 ml-6 mb-2">
      <div className="h-px flex-1 bg-border" />
      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
        <Icon size={11} />
        {item.travel_time_minutes} min
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function PlaceCard({
  item,
  index,
  onExpand,
}: {
  item: ItineraryItem;
  index: number;
  onExpand: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="relative"
    >
      <TravelIndicator item={item} />

      <div className="flex gap-3 cursor-pointer group" onClick={onExpand}>
        <div className="flex flex-col items-center pt-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-roxo ring-[3px] ring-roxo/10" />
          <div className="w-px flex-1 bg-border mt-1" />
        </div>

        <div className="flex-1 pb-5">
          <p className="text-[11px] font-medium text-roxo mb-1.5 tabular-nums">
            {item.start_time} — {item.end_time}
          </p>

          <div className="bg-card rounded-xl overflow-hidden border border-border group-hover:shadow-md group-hover:border-roxo/20 transition-all">
            {item.photo_url && (
              <div className="h-36 overflow-hidden">
                <img
                  src={item.photo_url}
                  alt={item.place_name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
            )}

            <div className="p-3.5">
              <h3 className="font-semibold text-grafite">{item.place_name}</h3>

              <div className="flex items-center gap-2.5 mt-1.5 flex-wrap">
                {item.rating && (
                  <span className="flex items-center gap-0.5 text-xs text-amarelo-sol font-medium">
                    <Star size={12} fill="currentColor" />
                    {item.rating}
                    {item.review_count && (
                      <span className="text-muted-foreground font-normal ml-0.5">
                        ({item.review_count.toLocaleString("pt-BR")})
                      </span>
                    )}
                  </span>
                )}
                {item.estimated_cost === 0 && (
                  <span className="text-[11px] font-medium bg-verde/10 text-verde px-1.5 py-0.5 rounded">
                    Gratuito
                  </span>
                )}
                {item.estimated_cost !== null && item.estimated_cost > 0 && (
                  <span className="text-xs text-verde font-medium">
                    R$ {item.estimated_cost.toFixed(0)}
                  </span>
                )}
              </div>

              {item.description && (
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              )}

              {item.google_maps_url && (
                <a
                  href={item.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-azul mt-2 hover:underline"
                >
                  <MapPin size={10} /> Ver no Maps
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PlaceDetail({
  item,
  onClose,
}: {
  item: ItineraryItem;
  onClose: () => void;
}) {
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
        className="bg-branco-cal w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[85vh] overflow-y-auto"
      >
        {item.photo_url && (
          <div className="relative h-52">
            <img
              src={item.photo_url}
              alt={item.place_name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 bg-black/30 backdrop-blur rounded-full flex items-center justify-center text-white"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="p-5">
          <h2 className="text-xl font-bold text-grafite">{item.place_name}</h2>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="flex items-center gap-1 text-sm text-roxo font-medium">
              <Clock size={13} /> {item.start_time} — {item.end_time}
            </span>
            {item.rating && (
              <span className="flex items-center gap-0.5 text-sm text-amarelo-sol font-medium">
                <Star size={13} fill="currentColor" /> {item.rating}
              </span>
            )}
          </div>

          {item.description && (
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              {item.description}
            </p>
          )}

          {item.historical_context && (
            <div className="mt-4 bg-terracota/8 rounded-lg p-3.5 border border-terracota/15">
              <p className="text-xs font-medium text-terracota mb-1">
                Contexto Histórico
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.historical_context}
              </p>
            </div>
          )}

          {item.opening_hours && item.opening_hours.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-muted-foreground mb-1.5">
                Horário de funcionamento
              </p>
              <div className="space-y-0.5">
                {item.opening_hours.map((h, i) => (
                  <p key={i} className="text-xs text-muted-foreground">{h}</p>
                ))}
              </div>
            </div>
          )}

          {item.additional_photo_urls && item.additional_photo_urls.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Mais fotos
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {item.additional_photo_urls.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`${item.place_name} ${i + 1}`}
                    className="h-20 w-28 rounded-lg object-cover flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          )}

          {item.google_maps_url && (
            <a
              href={item.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-azul text-white font-medium text-sm hover:bg-azul/90 transition-colors"
            >
              <Navigation size={16} /> Como chegar
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function DaySection({ day }: { day: ItineraryDay }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const weekday = WEEKDAY_PT[day.weekday] || day.weekday;
  const dateFormatted = new Date(day.date + "T12:00:00").toLocaleDateString(
    "pt-BR",
    { day: "numeric", month: "long" }
  );

  return (
    <div className="mb-6">
      <div className="sticky top-0 z-10 bg-branco-cal/90 backdrop-blur-sm py-2.5 mb-3">
        <h2 className="text-base font-bold text-grafite">
          Dia {day.day_number}
          <span className="text-muted-foreground font-normal text-sm ml-2">
            {weekday}, {dateFormatted}
          </span>
        </h2>
      </div>

      {day.items.map((item, idx) => (
        <PlaceCard
          key={idx}
          item={item}
          index={idx}
          onExpand={() => setExpanded(idx)}
        />
      ))}

      <AnimatePresence>
        {expanded !== null && (
          <PlaceDetail
            item={day.items[expanded]}
            onClose={() => setExpanded(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ItineraryView({
  itinerary,
  onRestart,
}: {
  itinerary: Itinerary;
  onRestart: () => void;
}) {
  const totalStops = itinerary.days.reduce((sum, d) => sum + d.items.length, 0);

  return (
    <div className="min-h-screen">
      <div className="relative px-4 pt-10 pb-8 text-grafite overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #1E88BD 0, #1E88BD 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #C8242E 0, #C8242E 1px, transparent 0, transparent 50%)`,
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-vermelho" />
          <div className="flex-1 bg-amarelo-sol" />
          <div className="flex-1 bg-azul" />
          <div className="flex-1 bg-verde" />
          <div className="flex-1 bg-rosa-frevo" />
          <div className="flex-1 bg-terracota" />
        </div>
        <div className="max-w-lg mx-auto relative">
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">
            Seu roteiro
          </p>
          <h1 className="text-2xl font-bold text-grafite">{itinerary.title}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {itinerary.days.length} {itinerary.days.length === 1 ? "dia" : "dias"} · {totalStops} paradas
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {(() => {
          const allItems = itinerary.days.flatMap((d) => d.items);
          const hasCoords = allItems.some((item) => item.latitude && item.longitude);
          if (!hasCoords) return null;
          return (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Map size={14} className="text-roxo" />
                <h3 className="text-sm font-semibold text-grafite">Mapa do roteiro</h3>
              </div>
              <div className="h-52 rounded-xl overflow-hidden border border-border shadow-sm">
                <DynamicItineraryMap items={allItems} />
              </div>
            </div>
          );
        })()}

        {itinerary.days.map((day) => (
          <DaySection key={day.day_number} day={day} />
        ))}

        <div className="mt-6 pb-8">
          <Button
            onClick={onRestart}
            variant="outline"
            className="w-full border-roxo text-roxo hover:bg-roxo hover:text-white"
          >
            <RotateCcw size={15} className="mr-2" />
            Planejar outra viagem
          </Button>
        </div>
      </div>
    </div>
  );
}
