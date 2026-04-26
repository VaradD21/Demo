# Swahit Backend

NestJS REST API powering the Swahit mental wellness platform.

## Stack

- **Framework**: NestJS 11
- **Language**: TypeScript
- **ORM**: Prisma 7 (LibSQL adapter)
- **Database**: SQLite (dev) / Supabase PostgreSQL (prod)
- **Auth**: JWT + Passport.js
- **AI**: Google Gemini 2.5 Flash (`@google/generative-ai`)

## Modules

| Module | Route | Description |
|---|---|---|
| Auth | `/auth` | Register, login, JWT |
| Users | `/users` | Profile management |
| Chatbot | `/chatbot` | AI companion, memory, threads |
| Mood | `/mood` | Mood logging and history |
| Appointments | `/appointments` | Doctor listing and booking |
| Questionnaire | `/questionnaire` | Wellness assessment |

## Setup

```bash
# Install dependencies
pnpm install

# Set up environment
cp ../.env.example .env
# Fill in DATABASE_URL, JWT_SECRET, GEMINI_API_KEY

# Push schema to database
npx prisma db push
npx prisma generate

# (Optional) Seed demo doctors
npx ts-node --project tsconfig.json src/prisma/seed.ts

# Start development server
pnpm start:dev
```

The API will be available at `http://localhost:3001`.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | `file:./dev.db` for SQLite |
| `JWT_SECRET` | ✅ | Secret for signing JWT tokens |
| `GEMINI_API_KEY` | ✅ | Google AI Studio key |
| `FRONTEND_URL` | ✅ | CORS allowed origin |
| `PORT` | ❌ | Defaults to `3001` |

## Key Architecture Decisions

- **Gemini integration**: System instruction is set at `getGenerativeModel()` level (not `startChat()`) for SDK v0.24 compatibility
- **Memory**: `UserMemoryProfile` is updated asynchronously every 15 messages to avoid blocking responses
- **Distress detection**: Keyword-based, non-blocking — returns `suggestProfessional: true` in the chat response when triggered
- **Auth guard**: Applied per-route, not globally, so public routes (doctor listing, models debug) remain accessible
