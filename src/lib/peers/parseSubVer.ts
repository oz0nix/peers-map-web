import { ApiPeer } from '#interfaces/peers'
import { PeerClient, PeerStats } from '#interfaces/peerStats'
import { PlacesType } from '#interfaces/places'
import { Category } from '#lib/MarkerCategories'

export const parseSubVer = (subVer?: string): { client: PeerClient; version: string | null } => {
  if (!subVer) return { client: 'other', version: null }
  const lower = subVer.toLowerCase()
  const matchNeutrino = lower.match(/neutrino:([0-9.]+)/)
  if (matchNeutrino && matchNeutrino[1]) return { client: 'neutrino', version: matchNeutrino[1] }
  const matchFloki = lower.match(/flokicoind:([0-9.]+)/)
  if (matchFloki && matchFloki[1]) return { client: 'flokicoind', version: matchFloki[1] }
  return { client: 'other', version: null }
}

export const computePeerStats = (peers: ApiPeer[]): PeerStats => {
  const init = () => ({ total: 0, versions: {} as Record<string, number> })
  const stats: PeerStats = {
    total: 0,
    neutrino: init(),
    flokicoind: init(),
    other: init(),
  }

  peers.forEach(p => {
    stats.total += 1
    const { client, version } = parseSubVer(p.subVer)
    const bucket = stats[client]
    bucket.total += 1
    if (version) bucket.versions[version] = (bucket.versions[version] || 0) + 1
  })

  return stats
}

type PeerWithGeo = ApiPeer & {
  geo: { status: string; lat: number; lon: number; country?: string; city?: string }
}
const hasValidGeo = (p: ApiPeer): p is PeerWithGeo =>
  !!(p.geo && p.geo.status === 'success' && typeof p.geo.lat === 'number' && typeof p.geo.lon === 'number')

export const mapPeersToPlaces = (peers: ApiPeer[]): PlacesType => {
  const places: PlacesType = peers.filter(hasValidGeo).map(p => ({
    id: p.id,
    position: [p.geo.lat, p.geo.lon],
    category: ((): Category => {
      const { client } = parseSubVer(p.subVer)
      return client === 'neutrino' ? Category.CAT2 : Category.CAT1
    })(),
    title: p.geo.city ? `${p.geo.city}, ${p.geo.country ?? ''}`.trim() : p.ip,
    address: p.subVer || p.ip,
  }))
  return places
}
