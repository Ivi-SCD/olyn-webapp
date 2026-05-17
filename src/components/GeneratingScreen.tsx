"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const FACTS = [
  "Olinda foi fundada em 1535 e é Patrimônio Mundial da UNESCO desde 1982.",
  "O nome Olinda veio da exclamação \"Ó linda!\" de Duarte Coelho ao ver a paisagem.",
  "O Homem da Meia-Noite é o boneco gigante mais antigo de Olinda, com mais de 4 metros.",
  "O frevo pernambucano é Patrimônio Imaterial da Humanidade pela UNESCO.",
  "O Convento de São Francisco guarda azulejos portugueses originais do século XVIII.",
  "A tapioca, o bolo de rolo e a cartola são clássicos da gastronomia local.",
  "Olinda abriga mais de 20 igrejas barrocas históricas em suas ladeiras.",
  "Em 2026, Olinda celebra seus 491 anos de história e cultura.",
];

export default function GeneratingScreen() {
  const fact = FACTS[Math.floor(Math.random() * FACTS.length)];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Loader2
            size={40}
            className="mx-auto text-roxo animate-spin"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-grafite mb-2"
        >
          Montando seu roteiro
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-sm mb-8"
        >
          Selecionando os melhores pontos de Olinda pra você...
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-xl p-4 border border-border text-left"
        >
          <p className="text-xs font-medium text-terracota mb-1">
            Curiosidade sobre Olinda
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {fact}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
