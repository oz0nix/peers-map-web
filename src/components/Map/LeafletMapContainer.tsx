import { LatLngBoundsExpression, LatLngExpression, MapOptions } from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'

import { AppConfig } from '#lib/AppConfig'

import useMapContext from './useMapContext'

export const LeafletMapContainer: React.FC<
  {
    center: LatLngExpression
    children: JSX.Element | JSX.Element[]
    zoom: number
  } & MapOptions
> = ({ ...options }) => {
  const { setMap } = useMapContext()

  return (
    <MapContainer
      ref={e => setMap && setMap(e || undefined)}
      className="absolute h-full w-full text-white outline-0"
      maxBounds={AppConfig.lockToWorld ? (AppConfig.worldBounds as LatLngBoundsExpression) : undefined}
      maxBoundsViscosity={AppConfig.lockToWorld ? AppConfig.lockViscosity : undefined}
      worldCopyJump={false}
      {...options}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        noWrap
        bounds={AppConfig.worldBounds as LatLngBoundsExpression}
      />
      {options.children}
    </MapContainer>
  )
}
