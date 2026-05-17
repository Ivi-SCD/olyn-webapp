# Olyn - Web App

Frontend da plataforma Olyn: roteiros inteligentes com IA e guias turisticos sob demanda para Olinda, PE.

## Stack

- Next.js 15 (App Router, Turbopack)
- React 19
- Tailwind CSS v4
- shadcn/ui (base-ui)
- Framer Motion
- Lucide React

## Funcionalidades

- **Planejador com IA** (`/planner`) — Onboarding de 5 etapas que gera roteiro personalizado via Groq
- **Meus Roteiros** (`/my-trips`) — Listar, visualizar, editar titulo e excluir roteiros salvos
- **Guias Turisticos** (`/guides`) — Marketplace de guias locais com filtros e ordenacao
- **Guias Proximos** (`/guides/nearby`) — Experiencia "uber-like" mostrando guias disponiveis em tempo real baseado na geolocalizacao
- **Visualizacao de Roteiro** (`/trip/[id]`) — Timeline completa com fotos, horarios, avaliacoes e links do Google Maps

## Desenvolvimento

```bash
# Instalar dependencias
npm install

# Rodar em modo desenvolvimento (porta 3000)
npm run dev

# Build de producao
npm run build
npm start
```

## Configuracao

O frontend faz proxy das chamadas `/api/*` para `http://localhost:8000` (backend FastAPI). Isso esta configurado em `next.config.ts`.

Para producao, ajuste a URL do backend no `next.config.ts` ou configure uma variavel de ambiente.

## Estrutura

```
src/
  app/
    page.tsx          # Landing page
    planner/          # Fluxo de criacao de roteiro
    my-trips/         # Lista de roteiros salvos
    guides/           # Marketplace de guias
    guides/nearby/    # Guias proximos (geolocalizacao)
    trip/[id]/        # Detalhe do roteiro
  components/         # Componentes reutilizaveis
  lib/                # API client, tipos, constantes
```

## Paleta de Cores (Olinda)

| Cor | Hex |
|-----|-----|
| Vermelho | #C8242E |
| Amarelo Sol | #F5B225 |
| Azul | #1E88BD |
| Verde | #3A8C5A |
| Rosa Frevo | #E84A7F |
| Roxo | #7B3FE4 |
| Coral | #FF7B54 |
| Terracota | #C76A38 |
| Grafite | #1F2937 |
| Branco Cal | #F5EEDF |
