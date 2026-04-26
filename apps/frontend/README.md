# Swahit Frontend

Next.js 15 web application for the Swahit mental wellness platform.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Auth**: JWT stored in localStorage via React context
- **API**: Fetch wrapper (`src/lib/api.ts`)

## Pages

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/login` | Public | Login / Sign up |
| `/terms` | Public | Terms & Conditions |
| `/privacy` | Public | Privacy Policy |
| `/disclaimer` | Public | AI disclaimer |
| `/support` | Public | Help & crisis contacts |
| `/dashboard` | Auth | Dashboard home |
| `/dashboard/chatbot` | Auth | AI companion chat |
| `/dashboard/mood` | Auth | Mood tracker |
| `/dashboard/insights` | Auth | Wellness insights |
| `/dashboard/appointments` | Auth | Book appointments |
| `/dashboard/profile` | Auth | User profile |
| `/dashboard/settings` | Auth | App settings |

## Setup

```bash
# Install dependencies
pnpm install

# Set up environment
cp ../../.env.example .env.local
# Fill in NEXT_PUBLIC_API_URL

# Start dev server
pnpm dev
```

Frontend runs at `http://localhost:3000`.

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL (e.g., `http://localhost:3001`) |

## Component Structure

```
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── auth/         # Login/signup form
│   ├── dashboard/    # Sidebar, chat message
│   └── ui/           # shadcn/ui components
├── context/          # Auth context provider
├── images/           # Local brand assets (logo.png)
└── lib/
    └── api.ts        # Authenticated fetch wrapper
```
