# AI Deploy — Backend Setup (Phase 1)

This backend gives you:
- Real email/password auth with JWT
- Real GitHub OAuth login ("Continue with GitHub")
- Email verification using a **fixed dev OTP (`1111`)** — real Gmail sending comes later
- ONE AI agent (Claude) that generates a complete static website from a prompt
- Real Docker build + run pipeline with dynamic port assignment

## 1. Install dependencies

```
cd ai-deploy-backend
npm install
```

## 2. Create your .env file

```
cp .env.example .env
```

Then fill in the values below.

## 3. MongoDB

You said you already have local MongoDB installed. Just make sure it's running:

```
mongod --dbpath /path/to/your/data
```

Default `.env` value `mongodb://127.0.0.1:27017/ai-deploy` will work as-is if MongoDB runs on the default port.

## 4. Anthropic (Claude) API key

1. Go to https://console.anthropic.com
2. Create an API key
3. Put it in `.env` as `ANTHROPIC_API_KEY=sk-ant-...`

This is what powers the single AI generation agent.

## 5. GitHub OAuth App — step by step

A GitHub OAuth App is what lets your site say "Continue with GitHub" and get the user logged in via their GitHub account.

1. Go to https://github.com/settings/developers
2. Click **"OAuth Apps"** → **"New OAuth App"**
3. Fill in:
   - **Application name**: `AI Deploy (Dev)`
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: `http://localhost:5000/api/auth/github/callback`
4. Click **Register application**
5. You'll see a **Client ID** immediately. Click **"Generate a new client secret"** to get the secret.
6. Copy both into your `.env`:
   ```
   GITHUB_CLIENT_ID=your_client_id_here
   GITHUB_CLIENT_SECRET=your_client_secret_here
   GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback
   ```

**Important:** the callback URL in your `.env` must match EXACTLY what you typed into GitHub's settings, or GitHub will reject the login with a "redirect_uri_mismatch" error.

## 6. JWT / Session secrets

Just put any long random string for `JWT_SECRET` and `SESSION_SECRET`. Example way to generate one:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run it twice, use one output for each.

## 7. Docker

Make sure Docker Desktop (or the Docker daemon) is installed and running on your machine — this backend calls the `docker` CLI directly (`docker build`, `docker run`, `docker rm`), so if `docker` isn't on your PATH and running, generation will fail at the build step with a clear error message.

Test it works:
```
docker --version
docker run hello-world
```

## 8. Run the backend

```
npm run dev
```

You should see:
```
[db] MongoDB connected: 127.0.0.1
[server] AI Deploy backend running on http://localhost:5000
```

## 9. Test it's alive

```
curl http://localhost:5000/api/health
```

Should return `{"status":"ok", ...}`.

## API summary

| Method | Route | Auth required | Purpose |
|---|---|---|---|
| POST | /api/auth/register | No | Create account, sends fixed OTP (1111) |
| POST | /api/auth/verify-otp | No | Verify with `otp: "1111"` |
| POST | /api/auth/resend-otp | No | Re-issue the fixed OTP |
| POST | /api/auth/login | No | Email/password login, returns JWT |
| GET | /api/auth/me | Yes | Current logged-in user |
| GET | /api/auth/github | No | Starts GitHub OAuth flow (redirect) |
| GET | /api/auth/github/callback | No | GitHub redirects here, then back to frontend with a token |
| POST | /api/generate | Yes | `{ prompt }` → runs full pipeline, returns project with live preview URL |
| GET | /api/generate | Yes | List your generated projects |
| GET | /api/generate/:id | Yes | Get one project's status/details |
| DELETE | /api/generate/:id | Yes | Stop container, delete files + record |

## Known limitations of this Phase 1 backend (by design)

- OTP is hardcoded to `1111` — no real email is sent yet.
- Only ONE AI agent — it generates a complete static site in one shot, not a multi-agent pipeline.
- Generated apps are static (HTML/CSS/JS served via nginx in Docker) — no generated backend/DB yet, per the phased plan.
- No GitHub push, no Jenkins CI/CD yet — those are later phases.
