<p align="center">
  <img src="public/logo.svg" alt="Lokichain Peers Map logo" width="160" />
</p>

# Lokichain Peers Map

Discover the global network of Lokichain peers on an interactive world map. Track their distribution in real time with client, version, and location insights layered in context.

## Highlights

- Global map that clusters peers and reveals hot spots as you zoom
- Detailed peer cards with geographic, version, and client information
- Real-time stats panel that aggregates peers by client family and release
- Quick actions to refocus on the active network or locate the viewer

## Preview

![Lokichain Peers Map preview](public/lokichain-peers-map.png)

## Requirements

- Node.js 18 or newer
- Yarn or npm

## Configuration

The app expects an accessible peers API exposing a `/peers` endpoint. Create `.env.local` in the project root and point it to your endpoint:

```bash
NEXT_PUBLIC_PEERS_API_URL=http://localhost:8787
```

- The frontend calls `GET {BASE_URL}/peers`.
- Responses must return an array of peers with IDs, IPs, `subVer`, and optional geolocation metadata.

### Sample response

```json
{
  "peers": [
    {
      "id": "string",
      "ip": "1.2.3.4",
      "subVer": "Flokicoind:0.1.0",
      "geo": {
        "status": "success",
        "lat": 48.8566,
        "lon": 2.3522,
        "city": "Paris",
        "country": "FR"
      }
    }
  ]
}
```

## Getting Started

Install dependencies and launch the development server:

```bash
yarn && yarn dev
# or
npm install && npm run dev
```

## Production Build

```bash
yarn build && yarn start
# or
npm run build && npm start
```

## License

MIT (see `package.json`).
