# FijiBoundless

Verified accessibility guide to Fiji — built on Cloudflare Pages + D1 + Pages Functions.

---

## Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React + Vite → Cloudflare Pages   |
| Backend   | Cloudflare Pages Functions (edge) |
| Database  | Cloudflare D1 (SQLite)            |
| Storage   | Cloudflare R2 (photos/videos)     |

---

## First-time setup

### 1. Prerequisites
- [Node.js 18+](https://nodejs.org)
- A free [Cloudflare account](https://dash.cloudflare.com/sign-up)

### 2. Install dependencies
```bash
npm install
```

### 3. Login to Cloudflare
```bash
npx wrangler login
```

### 4. Create the D1 database
```bash
npx wrangler d1 create fijiboundless
```
Copy the `database_id` printed and paste it into `wrangler.toml`:
```toml
database_id = "PASTE_YOUR_ID_HERE"
```

### 5. Create the tables
```bash
npm run db:init
```

### 6. Load seed data
```bash
npm run db:seed
```

### 7. Run locally
```bash
npm run build
npm run pages:dev
```
Open http://localhost:8788

---

## Deploy to Cloudflare (production)

```bash
npm run deploy
```

This builds React and deploys everything — frontend + API functions + D1 binding — in one command.

Your site will be live at `https://fijiboundless.pages.dev` (or your custom domain).

---

## Connect to GitHub for auto-deploy

1. Push this repo to GitHub
2. In [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create a project → Connect to Git
3. Select your repo
4. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Environment variables → Add D1 binding: `DB` → `fijiboundless`
6. Every push to `main` deploys automatically

---

## API endpoints

All endpoints are in `functions/api/` and run on the Cloudflare edge.

| Method | Path                        | Description                          |
|--------|-----------------------------|--------------------------------------|
| GET    | `/api/facilities`           | List facilities (filter + geo sort)  |
| GET    | `/api/facilities/:id`       | Single facility + active alerts      |
| GET    | `/api/nearest-toilet`       | Nearest toilets from GPS coords      |
| GET    | `/api/alerts`               | All active live alerts               |
| POST   | `/api/alerts`               | Submit a new alert                   |
| POST   | `/api/verify`               | Submit a verification                |

### Example — nearest toilet
```
GET /api/nearest-toilet?lat=-17.7559&lng=177.4432&limit=3
```

### Example — facilities near Nadi
```
GET /api/facilities?lat=-17.7559&lng=177.4432&radius_km=10&category=hotel
```

---

## Database

Schema and seed files are in `database/`.

```bash
npm run db:init          # create tables (local)
npm run db:init:remote   # create tables (production)
npm run db:seed          # load sample data (local)
npm run db:seed:remote   # load sample data (production)
```

---

## Project structure

```
fijiboundless/
├── database/
│   ├── schema.sql          # D1 table definitions
│   └── seed.sql            # Sample data
├── functions/
│   ├── _shared.js          # Shared utilities (haversine, CORS, base query)
│   └── api/
│       ├── facilities.js         # GET /api/facilities
│       ├── facilities/[id].js    # GET /api/facilities/:id
│       ├── nearest-toilet.js     # GET /api/nearest-toilet
│       ├── alerts.js             # GET+POST /api/alerts
│       └── verify.js             # POST /api/verify
├── src/
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Footer.jsx
│   │   ├── FacilityCard.jsx
│   │   └── VerifiedBadge.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Search.jsx
│   │   └── Facility.jsx
│   ├── styles/global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── wrangler.toml
└── package.json
```
