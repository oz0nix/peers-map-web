export interface ComponentVersionInfo {
  name: string
  major: number
  minor: number
  patch: number
  build: string
}

export interface NodeVersionResponse {
  flokicoind: ComponentVersionInfo
  neutrino: ComponentVersionInfo
  ts: number
}
