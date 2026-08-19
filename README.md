<div align="center">
  
# 🚀 Recruit AI
**The Future of Intelligent Hiring & Candidate Matching**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Website-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://recruit-ai-hazel-one.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Tech-Next.js%20%7C%20Node.js%20%7C%20PostgreSQL-blue?style=for-the-badge)]()

*Recruit AI is a full-stack, AI-powered hiring platform that completely automates resume parsing, skill matching, and candidate ranking using large language models and vector embeddings.*

[**Live Application**](https://recruit-ai-hazel-one.vercel.app) • [**Report Bug**](#) • [**Request Feature**](#)

</div>

<br />

## ✨ Features
Recruit AI acts as a smart bridge between eager candidates and busy recruiters, dramatically reducing time-to-hire through intelligent automation.

- **🤖 AI Resume Parsing**: Upload a PDF, and our AI instantly extracts key skills, experience, and education without tedious manual entry.
- **🎯 Semantic Candidate Matching**: Powered by `pgvector` and the Groq LLM, Recruit AI goes beyond keyword matching to semantically rank candidates against job descriptions.
- **📊 Premium Dashboards**: Real-time analytics, animated statistical cards, and interactive kanban boards for pipeline management.
- **⚡ Background Processing**: Heavy AI workloads are offloaded to BullMQ background workers backed by Redis, keeping the UI lightning fast.
- **✉️ Automated Communications**: Seamlessly schedule interviews and trigger automated email updates (via Resend) as candidates move through the pipeline.

## 🛠️ Technology Stack
- **Frontend**: Next.js 16 (App Router), React, Tailwind CSS, Framer Motion, shadcn/ui.
- **Backend**: Node.js, Express.js, TypeScript.
- **Database**: PostgreSQL (Neon) with Prisma ORM and `pgvector`.
- **Cache & Queue**: Redis (Upstash) & BullMQ.
- **AI & Processing**: Groq SDK (Llama models) for semantic matching, Xenova/transformers for embeddings.

## 📂 File Architecture
The project is built as a clean, scalable monorepo separating the Next.js frontend from the Express backend:

```text
Recruit AI/
├── frontend/                 # Next.js App Router Application
│   ├── src/
│   │   ├── app/              # Routes (recruiter, candidate, auth, etc.)
│   │   ├── components/       # Reusable React components (UI, layout, landing)
│   │   ├── lib/              # Utilities, contexts, and API handlers
│   │   └── styles/           # Global styling (globals.css, Tailwind config)
│   └── package.json          # Frontend dependencies
│
├── backend/                  # Node.js + Express Backend
│   ├── src/
│   │   ├── controllers/      # Request handlers (auth, candidates, recruiter)
│   │   ├── routes/           # Express route definitions
│   │   ├── services/         # Business logic (JWT, AI processing)
│   │   ├── workers/          # BullMQ background workers
│   │   ├── utils/            # Helper functions (Prisma, Groq API, Resend)
│   │   └── server.ts         # Express entry point
│   ├── prisma/
│   │   └── schema.prisma     # Database models and relations
│   └── package.json          # Backend dependencies
│
└── README.md                 # Project documentation
```

## 🚀 Quick Start (Local Setup)

To run Recruit AI locally, you'll need Node.js, a PostgreSQL database (with `vector` extension), and a Redis instance.

**1. Clone the repository**
```bash
git clone https://github.com/isahilmishra/Recruit-AI.git
cd Recruit-AI
```

**2. Setup Backend**
```bash
cd backend
npm install

# Create a .env file and add your credentials (DATABASE_URL, REDIS_URL, GROQ_API_KEY, etc.)

npx prisma generate
npx prisma db push
npm run dev
```

**3. Setup Frontend**
```bash
cd ../frontend
npm install

# Create a .env.local file
# NEXT_PUBLIC_API_URL="http://localhost:5000/api"

npm run dev
```

Visit `http://localhost:3000` to view the application!

---
<div align="center">
  <i>Built with modern tooling for a modern hiring experience.</i>
</div>
