# Dr. B. R. Ambedkar Digital Heritage Archive — Frontend Prototype

A software-only prototype (Next.js 14 / React / TypeScript / Tailwind CSS) built
for an SIH demonstration. It runs entirely in a desktop browser — there is no
Raspberry Pi, GPIO, sensor, or kiosk hardware code in this repository.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To test a production build:

```bash
npm run build
npm run start
```

## Project structure

```
app/                  Next.js App Router pages
  page.tsx            Home
  assistant/           AI Assistant (text + voice)
  archive/             Digital Archive browser
  archive/[id]/        Document viewer
  timeline/            Timeline
  knowledge-graph/      Knowledge graph
  media/               Audio & video archive
  about/               About this prototype

components/           Shared UI components (Navigation, cards, viewers, etc.)
services/              api.ts, ai.ts, archive.ts, websocket.ts — service layer
data/mock/             Clearly-flagged sample/demo data
types/                 Shared TypeScript types
```

## Mock data vs. real integration

Every mock record includes `isMock: true` and the UI labels demo content
explicitly (e.g. "Demo response — shown for prototype purposes"). The
`services/` layer is the single place that decides between mock data and a
real backend call:

- Set `NEXT_PUBLIC_MOCK_MODE=false` and `NEXT_PUBLIC_API_BASE_URL` /
  `NEXT_PUBLIC_WS_URL` (see `.env.example`) once a real backend is available.
- Each service function still falls back to mock data if the real request
  fails, so the demo never breaks during a live presentation.

## Known prototype limitations

- No real speech-to-text, RAG/LLM, or text-to-speech is connected — voice
  recording and transcription in `services/ai.ts` are simulated.
- The knowledge graph, timeline, and archive records are illustrative demo
  data, not a verified/complete historical dataset.
- Language selector supports English fully; Tamil, Hindi and Marathi are
  shown as upcoming options with no machine translation wired in yet.
- The dynamic document-viewer route renders a correct "not available" state
  for unknown IDs, but currently returns an HTTP 200 rather than 404 for that
  page — cosmetic only, does not affect the demo flow.
