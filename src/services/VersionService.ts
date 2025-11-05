import axios from 'axios'

import { NodeVersionResponse } from '#interfaces/version'
import { AppConfig } from '#src/config/AppConfig'

export const getNodeVersion = async (): Promise<NodeVersionResponse | undefined> => {
  const baseUrl = AppConfig.peersApiUrl
  if (!baseUrl) return undefined

  try {
    const url = `${baseUrl.replace(/\/$/, '')}/version`
    const { data } = await axios.get<NodeVersionResponse>(url, { timeout: 10_000 })
    return data
  } catch {
    return undefined
  }
}
