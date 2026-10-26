# cop-portal-backend

NestJS + Prisma + PostgreSQL backend for the COP32 Ethiopia admin dashboard and public content API.

## Stack

- NestJS 11, Prisma ORM, PostgreSQL (via Docker Compose)
- JWT email/password auth
- REST endpoints for pages, news, sponsors, FAQ, dashboard stats, and file uploads

## Development

```bash
docker compose up -d
npm install
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run start:dev
```

API listens on `http://localhost:3001/api` by default. See `.env` for configuration (copy from a local `.env` — not committed).
