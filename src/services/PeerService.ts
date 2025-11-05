import axios from 'axios'

import { ApiPeer, PeersApiResponse } from '#interfaces/peers'
import { PlacesType } from '#interfaces/places'
import { mapPeersToPlaces } from '#lib/peers/parseSubVer'
import { AppConfig } from '#src/config/AppConfig'

export const getPeersRaw = async (): Promise<ApiPeer[]> => {
  const baseUrl = AppConfig.peersApiUrl
  if (!baseUrl) return []

  try {
    const url = `${baseUrl.replace(/\/$/, '')}/peers`
    const { data } = await axios.get<PeersApiResponse>(url, { timeout: 10_000 })
    return data?.peers ?? []
  } catch {
    return []
  }
}

export const getPeers = async (): Promise<PlacesType> => {
  const peers = await getPeersRaw()
  return mapPeersToPlaces(peers)
}
