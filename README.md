**Employee Shift Scheduler**

A simple full-stack app for creating and managing employee shifts. This repository contains a `backend` (Express + MongoDB) and a `frontend` (Vite + React) application.

**Features**
- **Auth:** User registration and login with JWTs.
- **Employees:** Create and manage employees (`backend/models/Employee.js`).
- **Shifts:** Create, edit and list shifts (`backend/models/Shift.js`).
- **Role-based routes:** Middleware protects admin-only actions (`backend/middleware/role.js`).

**Testing / Demo**
- **Live demo:** https://employee-shift-rho.vercel.app/

**Quick Start (Local)**
- **Prerequisites:** `node` (16+), `npm` or `pnpm`, MongoDB (or a cloud URI).
- **Backend:**
  - `cd backend`
  - `npm install`
  - Create a `.env` file (see `backend/.env.example` if present) with `PORT`, `MONGO_URI`, `JWT_SECRET`.
  - `npm run dev` (or `node server.js`)
- **Frontend:**
  - `cd frontend`
  - `npm install`
  - `npm run dev`

**Important Security Note**
- I removed `backend/.env` from the index and added `.gitignore` entries to stop tracking environment files. The `.env` that was previously committed contained secrets (database URI and JWT secret). If those credentials are active you should rotate them immediately.
- If you want help purging secrets from the git history (rewriting history with `git filter-repo` or BFG), I can assist — note this requires a force-push and coordination with collaborators.

**Repository Layout**
- `backend/` — Express API, models, controllers, routes.
- `frontend/` — Vite + React frontend (components in `src/components`, pages in `src/pages`).

**Commit & Push (suggested)**
Run from the repository root to add and push this README:
```
git add README.md .gitignore
git commit -m "Add README and update .gitignore"
git push origin main
```

If you want, I can run the commit and push for you now.
