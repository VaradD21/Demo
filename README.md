# Swahit — Mental Wellness Platform

> A calm, trustworthy, and emotionally intelligent mental wellness companion built for people who need support, reflection, and professional connection.

[![Next.js](https://img.shields.io/badge/Frontend-Next.js_15-black?logo=next.js)](https://nextjs.org)
[![NestJS](https://img.shields.io/badge/Backend-NestJS-e0234e?logo=nestjs)](https://nestjs.com)
[![Prisma](https://img.shields.io/badge/ORM-Prisma_7-2D3748?logo=prisma)](https://prisma.io)
[![Gemini](https://img.shields.io/badge/AI-Gemini_2.5_Flash-4285F4?logo=google)](https://ai.google.dev)
[![pnpm](https://img.shields.io/badge/Package_Manager-pnpm-F69220?logo=pnpm)](https://pnpm.io)

---

## What is Swahit?

Swahit is a mental wellness SaaS platform. Users chat with an AI companion that provides emotional support, tracks mood patterns, detects distress signals, and gently connects users with licensed professionals when needed.

**Core flow:**
1. User signs up → gets access to the AI companion
2. AI builds trust through warm, empathetic conversations
3. AI detects recurring distress patterns and suggests professional help
4. User books appointments with therapists/counsellors on the platform
5. Premium plans unlock deeper support and analytics

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | NestJS 11, TypeScript |
| Database | SQLite (dev) / Supabase PostgreSQL (prod) |
| ORM | Prisma 7 with LibSQL adapter |
| AI | Google Gemini 2.5 Flash |
| Auth | JWT + Passport.js |
| Package Manager | pnpm (monorepo) |

---

## Monorepo Structure

```
swahit-dev/
├── apps/
│   ├── frontend/          # Next.js web application
│   └── backend/           # NestJS REST API
├── packages/              # Shared types/utilities (future)
├── assets/                # Brand assets
├── docs/                  # Documentation
├── infra/                 # Docker / deployment configs
├── .env.example           # Environment variable template
├── pnpm-workspace.yaml    # pnpm workspace config
└── package.json           # Root scripts
```

---

## Quick Start

### Prerequisites
- Node.js 20+
- pnpm 9+ (`npm install -g pnpm`)

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/swahit.git
cd swahit
pnpm install
```

### 2. Configure Environment

```bash
# Copy env template
cp .env.example apps/backend/.env
cp .env.example apps/frontend/.env.local
```

Fill in your values in each `.env` file. See [Environment Variables](#environment-variables) section.

### 3. Set Up Database

```bash
cd apps/backend
npx prisma db push
npx prisma generate

# Seed demo doctors (optional)
npx ts-node --project tsconfig.json src/prisma/seed.ts
```

### 4. Run Development Servers

```bash
# From monorepo root — runs all apps in parallel
pnpm dev

# Or run individually:
cd apps/backend && pnpm start:dev   # Backend on http://localhost:3001
cd apps/frontend && pnpm dev        # Frontend on http://localhost:3000
```

---

## Environment Variables

### Backend (`apps/backend/.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | SQLite path (`file:./dev.db`) or PostgreSQL URL |
| `JWT_SECRET` | Long random secret for JWT signing |
| `GEMINI_API_KEY` | Google AI Studio API key |
| `FRONTEND_URL` | Allowed CORS origin |
| `PORT` | Backend port (default: 3001) |

### Frontend (`apps/frontend/.env.local`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend URL (default: `http://localhost:3001`) |

---

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Create account |
| POST | `/auth/login` | Get JWT token |
| POST | `/chatbot/message` | Send message to AI companion |
| GET | `/chatbot/threads` | List chat sessions |
| GET | `/appointments/doctors` | List available therapists |
| POST | `/appointments` | Book an appointment |
| POST | `/mood` | Log mood entry |
| GET | `/mood` | Get mood history |

---

## Key Features

- 🤖 **AI Companion** — Gemini 2.5 Flash with persistent memory, emotional context, and ethical escalation
- 🧠 **Memory System** — Conversation summaries, recurring stressor tracking, emotional pattern detection
- 🚨 **Distress Detection** — AI detects crisis signals and surfaces appointment CTA in UI
- 📅 **Appointments** — Doctor/therapist listing and booking flow
- 😌 **Mood Tracker** — Daily emotional check-ins with intensity tracking
- 📊 **Insights** — Wellness trends and pattern overview
- 🔒 **Auth** — Secure JWT authentication, protected routes
- 📄 **Legal Pages** — Disclaimer, Privacy Policy, Terms & Conditions, Support

---

## Important Disclaimer

Swahit is a supportive wellness tool — **not a licensed medical service**. The AI companion is not a therapist, psychiatrist, or doctor. In an emergency, please contact local emergency services immediately.

---

## Contributing

This is a private startup repository. Contributions are by invitation only.

---

## License

Proprietary — All rights reserved © 2026 Swahit.
