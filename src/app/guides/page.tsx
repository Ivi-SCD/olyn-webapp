"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  MessageCircle,
  Clock,
  MapPin,
  Filter,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { listGuides, seedGuides, type TourGuide } from "@/lib/api";

const SORT_OPTIONS = [
  { value: "rating", label: "Melhor avaliação" },
  { value: "price_low", label: "Menor preço" },
  { value: "reviews", label: "Mais avaliações" },
];

const SPECIALTY_FILTERS = [
  "História",
  "Arte e Cultura",
  "Gastronomia",
  "Natureza",
  "Carnaval",
  "Artesanato",
  "Fotografia",
];

function GuideCard({
  guide,
  onSelect,
}: {
  guide: TourGuide;
  onSelect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-4 hover:shadow-md hover:border-roxo/20 transition-all cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex gap-3">
        <img
          src={guide.avatar_url || `https://api.dicebear.com/9.x/personas/svg?seed=${guide.name}`}
          alt={guide.name}
          className="w-14 h-14 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-grafite text-sm truncate">
              {guide.name}
            </h3>
            {guide.verified && (
              <CheckCircle2 size={13} className="text-azul flex-shrink-0" />
            )}
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            <span className="flex items-center gap-0.5 text-xs font-medium text-amarelo-sol">
              <Star size={11} fill="currentColor" />
              {guide.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-muted-foreground">
              ({guide.total_reviews} avaliações)
            </span>
          </div>

          <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
            {guide.bio}
          </p>

          <div className="flex flex-wrap gap-1 mt-2">
            {guide.specialties?.slice(0, 3).map((s) => (
              <Badge key={s} variant="secondary" className="text-[10px] px-1.5 py-0">
                {s}
              </Badge>
            ))}
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="text-sm font-bold text-roxo">
            R${guide.hourly_rate.toFixed(0)}
          </p>
          <p className="text-[10px] text-muted-foreground">/hora</p>
        </div>
      </div>
    </motion.div>
  );
}

function GuideDetail({
  guide,
  onClose,
}: {
  guide: TourGuide;
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
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-3">
              <img
                src={guide.avatar_url || `https://api.dicebear.com/9.x/personas/svg?seed=${guide.name}`}
                alt={guide.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-lg font-bold text-grafite">{guide.name}</h2>
                  {guide.verified && <CheckCircle2 size={15} className="text-azul" />}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-0.5 text-sm font-medium text-amarelo-sol">
                    <Star size={13} fill="currentColor" />
                    {guide.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {guide.total_reviews} avaliações · {guide.total_tours} passeios
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary"
            >
              <X size={16} className="text-muted-foreground" />
            </button>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {guide.bio}
          </p>

          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="bg-secondary rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-roxo">
                R${guide.hourly_rate.toFixed(0)}
              </p>
              <p className="text-[10px] text-muted-foreground">por hora</p>
            </div>
            <div className="bg-secondary rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-grafite">{guide.total_tours}</p>
              <p className="text-[10px] text-muted-foreground">passeios</p>
            </div>
            <div className="bg-secondary rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-grafite flex items-center justify-center gap-0.5">
                <Clock size={14} />
                {guide.response_time_minutes}min
              </p>
              <p className="text-[10px] text-muted-foreground">resposta</p>
            </div>
          </div>

          {guide.specialties && guide.specialties.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-medium text-grafite mb-2">Especialidades</p>
              <div className="flex flex-wrap gap-1.5">
                {guide.specialties.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {guide.languages && guide.languages.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-grafite mb-2">Idiomas</p>
              <div className="flex flex-wrap gap-1.5">
                {guide.languages.map((l) => (
                  <Badge key={l} variant="outline" className="text-xs">
                    {l}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {guide.featured_places && guide.featured_places.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-grafite mb-2">Lugares em destaque</p>
              <div className="space-y-1.5">
                {guide.featured_places.map((p) => (
                  <div
                    key={p}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <MapPin size={12} className="text-roxo flex-shrink-0" />
                    {p}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 space-y-2">
            {guide.whatsapp && (
              <a
                href={`https://wa.me/${guide.whatsapp.replace(/\D/g, "")}?text=Olá ${guide.name}! Vi seu perfil no Olyn e gostaria de contratar um passeio em Olinda.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-verde text-white font-medium text-sm hover:bg-verde/90 transition-colors"
              >
                <MessageCircle size={16} />
                Contatar via WhatsApp
              </a>
            )}
            {guide.instagram && (
              <a
                href={`https://instagram.com/${guide.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-grafite font-medium text-sm hover:bg-secondary transition-colors"
              >
                Instagram {guide.instagram}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GuidesPage() {
  const [guides, setGuides] = useState<TourGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuide, setSelectedGuide] = useState<TourGuide | null>(null);
  const [sortBy, setSortBy] = useState("rating");
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    try {
      await seedGuides();
      const data = await listGuides();
      setGuides(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredGuides = guides
    .filter((g) => {
      if (!specialty) return true;
      return g.specialties?.includes(specialty);
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price_low") return a.hourly_rate - b.hourly_rate;
      if (sortBy === "reviews") return b.total_reviews - a.total_reviews;
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 py-4 border-b border-border sticky top-0 bg-background/90 backdrop-blur-sm z-30">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/">
            <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
              <ArrowLeft size={18} className="text-grafite/60" />
            </button>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-grafite">Guias Turísticos</h1>
            <p className="text-xs text-muted-foreground">
              Profissionais locais prontos para te guiar
            </p>
          </div>
          <Link href="/guides/nearby">
            <button className="p-2 rounded-lg bg-verde/10 text-verde hover:bg-verde/20 transition-colors mr-1">
              <MapPin size={18} />
            </button>
          </Link>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              showFilters || specialty
                ? "bg-roxo/10 text-roxo"
                : "hover:bg-secondary text-muted-foreground"
            }`}
          >
            <Filter size={18} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-border overflow-hidden"
          >
            <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
              <div>
                <p className="text-xs font-medium text-grafite mb-2">Ordenar por</p>
                <div className="flex gap-2 flex-wrap">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                        sortBy === opt.value
                          ? "bg-roxo text-white"
                          : "bg-secondary text-grafite hover:bg-roxo/10"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-grafite mb-2">Especialidade</p>
                <div className="flex gap-2 flex-wrap">
                  {SPECIALTY_FILTERS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpecialty(specialty === s ? null : s)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                        specialty === s
                          ? "bg-roxo text-white"
                          : "bg-secondary text-grafite hover:bg-roxo/10"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-28 bg-card rounded-xl border border-border animate-pulse"
              />
            ))}
          </div>
        ) : filteredGuides.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              Nenhum guia encontrado com esse filtro.
            </p>
            <Button
              variant="ghost"
              className="mt-2 text-roxo"
              onClick={() => setSpecialty(null)}
            >
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredGuides.map((guide) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                onSelect={() => setSelectedGuide(guide)}
              />
            ))}
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedGuide && (
          <GuideDetail
            guide={selectedGuide}
            onClose={() => setSelectedGuide(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
