# RecruitAI

RecruitAI is a modern, AI-powered decision-support system designed to bridge the gap between recruiters and candidates. It leverages advanced Large Language Models (LLMs) to automatically parse resumes, analyze job descriptions, and calculate objective match scores, streamlining the hiring process.

![RecruitAI Dashboard](https://via.placeholder.com/1000x500.png?text=RecruitAI+Premium+Dashboard)

## Features

### For Candidates
*   **AI Resume Parsing:** Upload a raw text resume and have our AI instantly structure it into a clean, JSON-based professional profile (Core Skills, Experience, Education).
*   **Job Match Evaluator:** Paste a job description and instantly receive an AI-generated match score (0-100) detailing your exact fit, highlighting both matched skills and missing gaps.

### For Recruiters
*   **AI Job Description Parser:** Paste messy, unstructured job descriptions to instantly extract structured "Core Requirements" and "Nice-to-Haves".
*   **Automated Candidate Ranking:** View a dynamically ranked list of applicants based on how well their parsed resume matches the parsed job requirements.

## Tech Stack

**Frontend:**
*   Next.js 15 (App Router)
*   React 19
*   Tailwind CSS (Vanilla Customizations)
*   Shadcn UI (Component Library)
*   Framer Motion (Micro-animations and Transitions)
*   Lucide React (Icons)

**Backend:**
*   Node.js & Express.js
*   Prisma ORM
*   PostgreSQL (hosted on Neon)
*   Google Gemini API (`@google/genai`)

## Project Structure

The repository is structured as a modular monolith:

```
Recruit-AI/
├── frontend/               # Next.js Application
│   ├── src/
│   │   ├── app/            # App Router pages (candidate, recruiter, auth)
│   │   ├── components/     # Reusable UI components (candidate/, recruiter/, ui/)
│   │   └── lib/            # Frontend utilities
│   └── package.json
│
└── backend/                # Express API Server
    ├── prisma/             # Database schema and migrations
    ├── src/
    │   ├── controllers/    # Route controllers (ai.controller.ts)
    │   ├── routes/         # Express routes (ai.routes.ts)
    │   ├── utils/          # Core logic and AI integration (ai.ts)
    │   └── server.ts       # Server entry point
    └── package.json
```

## Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm or yarn
*   PostgreSQL Database (Neon recommended)
*   Google Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/Recruit-AI.git
    cd Recruit-AI
    ```

2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    
    # Create a .env file and add your credentials:
    # DATABASE_URL="postgresql://user:pass@ep-rest-of-url.neon.tech/neondb?sslmode=require"
    # GEMINI_API_KEY="your-gemini-api-key"
    
    # Generate Prisma client and push schema
    npx prisma generate
    npx prisma db push
    
    # Start the backend server
    npm run dev
    ```
    The backend will run on `http://localhost:5000`

3.  **Setup Frontend:**
    ```bash
    cd ../frontend
    npm install
    
    # Start the frontend dev server
    npm run dev
    ```
    The frontend will run on `http://localhost:3000`

## Development Notes
*   **AI Quota Limits:** To prevent hitting rate limits during UI development, the AI endpoints (`/api/ai/*`) currently have a built-in mock fallback. If the Gemini API throws a rate limit error, the backend gracefully catches it and returns a structurally perfect mock JSON response, ensuring frontend development is never blocked.
*   **Design Philosophy:** The UI is designed with a premium dark-mode aesthetic utilizing deep blues, subtle glassmorphism (`backdrop-blur`), and fluid Framer Motion animations to provide a top-tier user experience.

## License
MIT
