"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Sparkles,
  Users,
  Route,
  Star,
  Clock,
  Shield,
  Zap,
  ChevronRight,
  Navigation,
  Locate,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: typeof Sparkles;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="bg-card rounded-xl p-5 border border-border">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <h3 className="font-semibold text-grafite text-sm">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function GuidePreview() {
  const guides = [
    { name: "Dona Lúcia", rating: 5.0, specialty: "História", img: "lucia" },
    { name: "Maria do Carmo", rating: 4.9, specialty: "Arte Sacra", img: "maria" },
    { name: "João Pedro", rating: 4.8, specialty: "Gastronomia", img: "joao" },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {guides.map((g) => (
        <div
          key={g.name}
          className="flex-shrink-0 bg-card rounded-xl p-3 border border-border w-40"
        >
          <img
            src={`https://api.dicebear.com/9.x/personas/svg?seed=${g.img}`}
            alt={g.name}
            className="w-10 h-10 rounded-full mb-2"
          />
          <p className="font-semibold text-xs text-grafite">{g.name}</p>
          <p className="text-[10px] text-muted-foreground">{g.specialty}</p>
          <div className="flex items-center gap-0.5 mt-1">
            <Star size={10} className="text-amarelo-sol" fill="currentColor" />
            <span className="text-[10px] font-medium">{g.rating}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Colorful bar inspired by casarões */}
      <div className="h-1 flex">
        <div className="flex-1 bg-vermelho" />
        <div className="flex-1 bg-amarelo-sol" />
        <div className="flex-1 bg-azul" />
        <div className="flex-1 bg-verde" />
        <div className="flex-1 bg-rosa-frevo" />
        <div className="flex-1 bg-roxo" />
        <div className="flex-1 bg-coral" />
        <div className="flex-1 bg-terracota" />
      </div>

      {/* Nav */}
      <nav className="px-4 py-4 flex items-center justify-between max-w-5xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Olyn" className="h-8" />
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/my-trips">
            <Button variant="ghost" size="sm" className="text-xs">
              Meus roteiros
            </Button>
          </Link>
          <Link href="/guides">
            <Button variant="ghost" size="sm" className="text-xs">
              Guias
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 pt-8 pb-16 relative">
        {/* Azulejo pattern bg */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #7B3FE4 0, #7B3FE4 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #C8242E 0, #C8242E 1px, transparent 0, transparent 50%)`,
            backgroundSize: "24px 24px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative text-center max-w-lg"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-roxo bg-roxo/8 px-3 py-1 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-roxo rounded-full animate-pulse" />
            Olinda 500 Anos · Patrimônio UNESCO
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-grafite leading-[1.1]">
            Explore Olinda com
            <br />
            <span className="text-roxo">inteligência</span>
          </h1>

          <p className="text-base text-muted-foreground mt-4 leading-relaxed max-w-sm mx-auto">
            Roteiros personalizados com IA e guias turísticos locais sob
            demanda. A cultura de Olinda na palma da sua mão.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link href="/planner">
              <Button
                size="lg"
                className="bg-roxo hover:bg-roxo/90 text-white font-semibold h-12 px-7 rounded-xl shadow-lg shadow-roxo/20"
              >
                <Sparkles size={16} className="mr-2" />
                Criar roteiro com IA
              </Button>
            </Link>
            <Link href="/guides">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-7 rounded-xl border-border"
              >
                <Users size={16} className="mr-2" />
                Encontrar um guia
              </Button>
            </Link>
          </div>

          <p className="mt-3 text-[11px] text-muted-foreground">
            Gratuito · Sem cadastro · Dados reais do Google Maps
          </p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-4 py-12 bg-card/50 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-grafite text-center mb-2">
            Por que usar o Olyn?
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-md mx-auto">
            Combinamos IA generativa com dados reais para criar experiências
            únicas em Olinda
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <FeatureCard
              icon={Zap}
              title="IA Personalizada"
              description="Roteiros gerados com base nos seus interesses, orçamento e estilo de viagem"
              color="#7B3FE4"
            />
            <FeatureCard
              icon={Users}
              title="Guias Locais"
              description="Conecte-se com guias verificados que vivem e respiram Olinda"
              color="#E84A7F"
            />
            <FeatureCard
              icon={Route}
              title="Dados Reais"
              description="Horários, avaliações e rotas integrados com Google Maps"
              color="#1E88BD"
            />
            <FeatureCard
              icon={Shield}
              title="Freemium"
              description="Gere roteiros gratuitamente. Guias sob demanda quando precisar"
              color="#3A8C5A"
            />
          </div>
        </div>
      </section>

      {/* Guides preview */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-grafite">
                Guias turísticos locais
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Profissionais verificados, prontos para te guiar
              </p>
            </div>
            <Link
              href="/guides"
              className="text-xs font-medium text-roxo flex items-center gap-0.5 hover:underline"
            >
              Ver todos <ChevronRight size={12} />
            </Link>
          </div>
          <GuidePreview />
        </div>
      </section>

      {/* Uber-like feature */}
      <section className="px-4 py-12 bg-card/50 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-verde bg-verde/10 px-3 py-1 rounded-full mb-3">
                <Locate size={10} />
                Sob demanda
              </div>
              <h2 className="text-xl font-bold text-grafite leading-tight">
                Guias em tempo real,
                <br />como um Uber turístico
              </h2>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-sm">
                Veja guias disponíveis perto de você agora, com distância em
                tempo real, tempo estimado de chegada e solicite com um toque.
              </p>
              <Link href="/guides/nearby">
                <Button
                  size="lg"
                  className="mt-5 bg-verde hover:bg-verde/90 text-white font-semibold h-11 px-6 rounded-xl"
                >
                  <Navigation size={15} className="mr-2" />
                  Ver guias próximos
                </Button>
              </Link>
            </div>
            <div className="flex-shrink-0 relative">
              <div className="w-52 h-52 rounded-full bg-verde/5 border border-verde/10 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full bg-verde/8 border border-verde/15 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-verde/12 border border-verde/20 flex items-center justify-center">
                    <div className="w-5 h-5 bg-azul rounded-full relative">
                      <div className="absolute inset-0 bg-azul rounded-full animate-ping opacity-40" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-8">
                  <img
                    src="https://api.dicebear.com/9.x/personas/svg?seed=maria"
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-card shadow-sm"
                  />
                </div>
                <div className="absolute bottom-8 left-4">
                  <img
                    src="https://api.dicebear.com/9.x/personas/svg?seed=joao"
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-card shadow-sm"
                  />
                </div>
                <div className="absolute top-12 left-8">
                  <img
                    src="https://api.dicebear.com/9.x/personas/svg?seed=lucia"
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-card shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-12 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-grafite text-center mb-8">
            Como funciona
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              {
                step: "1",
                title: "Conte sobre você",
                desc: "Dias, interesses, orçamento e companhia",
              },
              {
                step: "2",
                title: "IA gera seu roteiro",
                desc: "Pontos reais com fotos, horários e avaliações",
              },
              {
                step: "3",
                title: "Explore ou contrate um guia",
                desc: "Siga por conta própria ou com um local",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-8 h-8 rounded-full bg-roxo text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-sm text-grafite">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-grafite">
            Pronto para explorar Olinda?
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Seu roteiro personalizado fica pronto em menos de 1 minuto
          </p>
          <Link href="/planner">
            <Button
              size="lg"
              className="mt-6 bg-roxo hover:bg-roxo/90 text-white font-semibold h-12 px-8 rounded-xl"
            >
              Começar agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Olyn" className="h-5 opacity-60" />
            <span className="text-xs text-muted-foreground">
              Olinda 500 Anos
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin size={10} />
            Olinda, PE, Brasil
          </div>
        </div>
      </footer>
    </div>
  );
}
