# Pralaydarshi

Pralaydarshi is a deterministic, explainable flash-flood and landslide decision-support prototype for vulnerable Himalayan villages and wards.

It combines rainfall, cumulative rainfall, river levels, river rise rate, soil saturation, slope exposure, historical exposure, population vulnerability, satellite context, and optional IoT telemetry into a local risk picture.

> This is a simulated, non-production demonstration. Risk scores and alerts are not official warnings. Authorized authorities remain responsible for operational decisions, evacuation, and public communication.

## Demo

- Live development app: `http://127.0.0.1:5173/`
- Repository: https://github.com/dakrkakashi/pralaydarshi
- Public alert view: `/citizen-alert`
- Authority dashboard: `/dashboard`

The demo uses six approximate Uttarakhand locations:

- Rudraprayag Sector 4
- Gopeshwar Ward 2
- Joshimath Lower Slopes
- Nainital Mall Road Wards
- Pauri Village
- Kedarnath Valley Hamlet

## Features

- Compound flood, landslide, vulnerability, and real-time condition scoring
- Four risk levels: Normal, Watch, Warning, and Critical
- Explicit unavailable-data handling: missing telemetry lowers confidence and is never treated as safe
- Estimated lead-time windows for warning states
- Leaflet map with OpenStreetMap and Esri satellite layers
- Flood-zone, landslide-zone, shelter, safe-route, and road-avoidance overlays
- Authority alert workflow: approve, broadcast, acknowledge, escalate, and resolve
- Public citizen alert interface with plain-language instructions
- Shelter capacity tracking and deterministic rainfall/river telemetry
- Explainability pipeline: Sense, Validate, Normalize, Compound, Localize, Estimate, Map & Alert
- Roadmap and reference architecture for future backend integration

## Technology

- React 19
- TypeScript 6
- Vite 8
- React Router
- Leaflet and React Leaflet
- Lucide React
- Vitest
- Oxlint

## Local setup

Requirements:

- Node.js 20 or newer
- npm 10 or newer

Install and start the app:

```bash
git clone https://github.com/dakrkakashi/pralaydarshi.git
cd pralaydarshi
npm install
npm run dev
```

Open `http://localhost:5173/` in a browser.

## Demo walkthrough

1. Open the landing page and select **Open dashboard**.
2. Use the demo operator form to enter the prefilled credentials.
3. Review the dashboard risk summary, map, shelter capacity, telemetry, and source health.
4. Open **Risk map** and switch between OSM, satellite, risk, flood-zone, landslide-zone, shelter, and route layers.
5. Open a location to inspect compound risk, unavailable inputs, shelters, and local GIS context.
6. Open **Alerts & response** and approve the pending Rudraprayag alert.
7. Broadcast an approved alert, then open **Public alert view** to see the citizen-facing message.
8. Review **Explainability** and **About** for the seven-stage pipeline, roadmap, technology stack, and limitations.

## Commands

```bash
npm run dev       # Start the Vite development server
npm run build     # Type-check and create the production build
npm run preview   # Preview the production build locally
npm run lint      # Run Oxlint
npm run test      # Run Vitest tests
```

## Project structure

```text
src/
  components/     Shared layout, cards, and Leaflet map components
  data/           Deterministic locations, alerts, geography, shelters, and telemetry
  hooks/          Auth, live timestamp, location, and alert state hooks
  lib/            Compound risk engine, workflow helpers, and constants
  pages/          Landing, authority, location, explainability, and citizen views
  types/          Shared TypeScript domain types
vercel.json       SPA rewrite for React Router deep links
```

## Risk model boundary

The current prototype uses a transparent deterministic compound model:

```text
Compound risk = flood risk * 0.38
              + landslide risk * 0.32
              + local vulnerability * 0.18
              + real-time conditions * 0.12
```

The model is for demonstration only. Infinite Slope Stability, LSTM, and XGBoost are roadmap validation methods, not claims about current production accuracy.

## Deploy to Vercel

### Recommended: deploy from GitHub

1. Open https://vercel.com/new.
2. Sign in with GitHub.
3. Select `dakrkakashi/pralaydarshi` and click **Import**.
4. Keep the repository root as the project root.
5. Set **Framework Preset** to `Vite` if Vercel does not detect it automatically.
6. Use these settings:

   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
   - Node.js version: `20.x` or newer

7. Click **Deploy**.

The included `vercel.json` rewrites all routes to `index.html`, so routes such as `/map`, `/about`, and `/citizen-alert` work after refresh.

### Deploy with the Vercel CLI

```bash
npm install -g vercel
vercel login
cd pralaydarshi
vercel
```

For the production deployment:

```bash
vercel --prod
```

## Deployment notes

- Leaflet base maps require network access in the browser.
- Coordinates and polygons are approximate demonstration geometry.
- No API keys or backend services are required for the prototype.
- Alert actions are local UI state and do not send SMS, push notifications, or government warnings.
- A production implementation would need validated data feeds, PostGIS/TimescaleDB, authentication, audit logging, monitoring, field validation, and authority governance.

## License

This repository is a prototype project for demonstration and evaluation. Add the appropriate license before public redistribution.
