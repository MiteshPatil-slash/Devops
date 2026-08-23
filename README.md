# AI Deploy — Full Project (Phase 1)

This folder contains BOTH halves of the project:

```
ai-deploy-project/
├── frontend/    ← React + Tailwind CSS (the UI)
└── backend/     ← Node/Express (auth, GitHub OAuth, AI agent, Docker pipeline)
```

They run as two separate servers (frontend on :5173, backend on :5000) and talk to
each other over HTTP — this is normal for a MERN-style app, they are not meant to
be merged into one server.

## Setup order

### 1. Backend first

```
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in:
- `MONGO_URI` — you said local MongoDB is ready, default value should work
- `ANTHROPIC_API_KEY` — get one at https://console.anthropic.com
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — **see `backend/SETUP.md` for the full walkthrough**, you said you weren't sure what a GitHub OAuth App was, that file explains it step by step
- `JWT_SECRET` / `SESSION_SECRET` — any long random string, `backend/SETUP.md` shows a one-line command to generate them

Make sure Docker Desktop is running, then:

```
npm run dev
```

You should see:
```
[db] MongoDB connected: 127.0.0.1
[server] AI Deploy backend running on http://localhost:5000
```

### 2. Frontend second (new terminal)

```
cd frontend
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173/login`).

## Test the flow

1. Create an account
2. On the Verify Email screen, enter **`1111`** — this is the fixed dev OTP you asked for, no real email is sent yet
3. You'll land on the Dashboard
4. Type a prompt (e.g. "Create a modern bakery website") and hit **Generate**
5. This is real — it calls Claude, writes the generated files to `backend/generated-apps/`, runs `docker build` and `docker run` on your machine, and gives you a live preview link once the container is up

"Continue with GitHub" will also work for real once you've filled in the GitHub OAuth values — until then it will redirect to GitHub and fail with a config error, which is expected.

## What's NOT built yet (by design, per the phased plan)

- Real Gmail OTP sending (still fixed to `1111`)
- Multiple AI agents (only one agent, generates a full static site in one shot)
- Generated apps' own backend/database (Phase 1 output is a static site only)
- GitHub push of generated code, Jenkins CI/CD, Docker registry, cloud deployment, rollback, monitoring, notifications, AI Support log analysis — these come in later phases per your 30-day plan
