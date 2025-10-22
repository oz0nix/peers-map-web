import { LatLngExpression } from 'leaflet'

import { Category } from '#lib/MarkerCategories'

export interface PlaceValues {
  id: number
  position: LatLngExpression
  category: Category
  title: string
  address: string
}

export type PlacesType = PlaceValues[]
export type PlacesClusterType = Record<string, PlaceValues[]>

