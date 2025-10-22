Flokicoin Nodes Map (Next.js + React Leaflet)
===============

A web app to visualize Flokicoin network nodes on an interactive map. It’s built with Next.js 14, TypeScript, React Leaflet, Tailwind CSS, and Lucide icons. Nodes are clustered by category with custom icons and colors, and a bottom sheet shows live statistics by client and version.

### Features

- Modern stack: Next.js 14, TypeScript, React Leaflet, Tailwind, Lucide
- Fetch peers from a configurable API (`/peers`)
- Node categories: Flokicoind and Neutrino (distinct colors/icons)
- Marker clustering with count bubbles
- Custom marker popups
- Bottom sheet with client/version stats
- Utility buttons: center to markers, locate me

### Requirements

- Node.js 18+
- Yarn or npm

### Configuration

Provide the base URL for the peers API (must expose a `/peers` endpoint). Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_PEERS_API_URL=http://localhost:8787
```

- The app calls `GET {BASE}/peers`.
- See `src/services/PeerService.ts` and `src/lib/peers/parseSubVer.ts` for fetching, mapping, and stats logic.
- App options (zoom, center, UI sizes) live in `src/lib/AppConfig.ts`.

Example response shape for `GET /peers`:

```json
{
  "peers": [
    {
      "id": "string",
      "ip": "1.2.3.4",
      "subVer": "Flokicoind:0.1.0" ,
      "geo": { "status": "success", "lat": 48.8566, "lon": 2.3522, "city": "Paris", "country": "FR" }
    }
  ]
}
```

### Quick Start

Install dependencies and start the dev server:

```bash
yarn && yarn dev
# or
npm install && npm run dev
```

Build and run in production:

```bash
yarn build && yarn start
# or
npm run build && npm start
```

### Project Structure (Highlights)

- `src/components/Map/` map components (cluster, markers, controls)
- `src/components/layouts/Sheet.tsx` bottom stats sheet
- `src/services/PeerService.ts` peers API client
- `src/lib/peers/parseSubVer.ts` parse `subVer`, compute stats, map categories
- `src/lib/MarkerCategories.ts` category icons and colors

### License

MIT (see `package.json`).
