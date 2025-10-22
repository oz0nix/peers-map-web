export type PeerClient = 'neutrino' | 'flokicoind' | 'other'

export type VersionCounts = Record<string, number>

export interface ClientStats {
  total: number
  versions: VersionCounts
}

export interface PeerStats {
  total: number
  neutrino: ClientStats
  flokicoind: ClientStats
  other: ClientStats
}

