# SmartFit AI - Frontend

Next.js frontend for SmartFit AI, an AI-powered CV analyzer that matches resumes against job descriptions.

## Features
- Clean, responsive UI (mobile, tablet, desktop)
- Signup / Login with automatic token refresh
- Upload CV (PDF, DOCX, PPTX) and paste job description
- View match score, missing skills, suggestions, and suggested roles
- Analysis history per user
- Dark theme

## Tech Stack
- Next.js (React)
- Tailwind CSS
- TypeScript

## Run locally
```bash
npm install
npm run dev
```

App runs on `http://localhost:3000`

## Backend
This frontend connects to the SmartFit AI backend (FastAPI). Make sure the backend is running and update the API URL in `lib/api.ts` and page files if the backend URL changes.

## Made by
MateenX-Studio