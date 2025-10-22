import { LatLngExpression } from 'leaflet'

// FIXME: naming and structure
export const AppConfig = {
  githubUrl: 'https://github.com/oz0nix/peers-map-web.git',
  flcUrl: 'https://docs.flokicoin.org',
  peersApiUrl: process.env.NEXT_PUBLIC_PEERS_API_URL,
  // World view defaults
  minZoom: 2,
  maxZoom: 18, // max zoom level of CARTO: 18
  initialZoom: 2,
  fitToMarkersOnLoad: true,
  ui: {
    topBarHeight: 80,
    bigIconSize: 48,
    mapIconSize: 32,
    markerIconSize: 32,
    menuIconSize: 16,
    topBarIconSize: 24,
  },
  // Center near equator to show all continents by default
  baseCenter: [0, 0] as LatLngExpression,
  // keep user from panning into repeated worlds and avoid duplicate continents
  worldBounds: [
    [-90, -180],
    [90, 180],
  ] as unknown as LatLngExpression[],
  lockToWorld: true,
  lockViscosity: 1.0,
}

export enum NavMenuVariant {
  INTRO = 'vertical',
  TOPNAV = 'horizontal',
}
