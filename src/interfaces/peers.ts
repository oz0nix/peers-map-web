export type ApiPeer = {
  id: number
  ip: string
  subVer?: string
  geo?: {
    status?: string
    lat?: number
    lon?: number
    country?: string
    city?: string
  }
}

export type PeersApiResponse = {
  peers: ApiPeer[]
  count: number
}

