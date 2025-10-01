# Backend (Express + TypeScript)


Run locally (Postgres + Prisma):

1. Copy `.env.example` to `.env` and fill values. Ensure `DATABASE_URL` points to Postgres.
2. npm install
3. npx prisma generate
4. npx prisma migrate dev --name init
5. npm run dev

API:
- GET /api/health

