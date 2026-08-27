# Roxlier Systems | Store Rating Platform

Store ratings for customers, operators, and store owners. This version uses MongoDB and Mongoose exclusively.

## Stack and architecture
The backend is an Express REST API using Mongoose models for `users`, `stores`, and `ratings`. JWT authentication, bcryptjs password hashing, Zod validation, RBAC, Helmet, CORS, rate limiting, and centralized error handling protect the API. The frontend is a Vite React SPA using React Router, Axios, Context API, and lucide-react.

## MongoDB setup
Install MongoDB locally or create a MongoDB Atlas cluster. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` to either `mongodb://127.0.0.1:27017/store_rating` or your Atlas connection string. Set a strong `JWT_SECRET`.

```powershell
npm run install:all
cd backend
npm run seed
npm run dev
```

In another terminal:

```powershell
cd frontend
npm install
npm run dev
```

## Demo accounts
All accounts use `DemoPass!1`:

| Role | Email |
|---|---|
| Administrator | admin@roxlier.demo |
| Normal user | user@roxlier.demo |
| Store owner | owner@roxlier.demo |
| Store owner | owner2@roxlier.demo |

## Roles and endpoints
Public authentication: `POST /api/auth/signup`, `POST /api/auth/login`.
Authenticated security: `PATCH /api/auth/update-password`.
Admin: `GET /api/admin/dashboard-stats`, `POST/GET /api/admin/users`, `GET /api/admin/users/:id`, `POST/GET /api/admin/stores`.
Normal user: `GET /api/stores`, `POST /api/stores/:storeId/rate`.
Store owner: `GET /api/owner/dashboard`.

Admin and store listings support server-side search, field filters, whitelisted sorting, pagination, and one-decimal rating averages. Rating writes use an atomic upsert and the MongoDB compound unique index `{ user: 1, store: 1 }`.

## Collections
`users` stores validated profiles and hashed passwords. `stores.owner` references one `STORE_OWNER` user and is unique. `ratings.user` and `ratings.store` reference their documents and are unique as a pair. Mongoose timestamps are enabled for all collections.

## Validation and security
Names are 20-60 characters, addresses max 400, passwords 8-16 characters with uppercase and special characters, emails are validated, and ratings are integer values from 1 to 5. ObjectIds are checked before queries. Passwords and hashes never appear in responses. Server-side JWT/RBAC checks are authoritative; duplicate emails, owners, and ratings are handled as conflicts.

## Environment
Backend: `MONGODB_URI`, `JWT_SECRET`, `PORT`, `CLIENT_URL`.
Frontend: `VITE_API_URL`.

## Future improvements
Refresh-token rotation, email verification, audit logs, automated API/browser tests, and richer owner analytics.
