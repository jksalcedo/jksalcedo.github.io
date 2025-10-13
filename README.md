# Portfolio (Next.js)

A minimal developer portfolio built with Next.js 15, TypeScript, and Tailwind CSS. It fetches your GitHub profile and pinned repositories.

Note: This project was created with Firebase Studio.

Quick start
- npm install
- Create a .env.local file (see below)
- npm run dev
- Open http://localhost:9002

Environment
- Required to customize: GITHUB_USERNAME=your_github_username
- Optional (for higher rate limits and richer data): GITHUB_TOKEN=your_github_pat
  - Without a token, the app falls back to a public pinned-repos service.

Build & start
- npm run build
- npm start

Main entry: src/app/page.tsx
