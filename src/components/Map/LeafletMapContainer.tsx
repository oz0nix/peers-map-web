import { LatLngBoundsExpression, LatLngExpression, MapOptions } from 'leaflet'
import { MapContainer } from 'react-leaflet'

import { AppConfig } from '#lib/AppConfig'

import { ColorizedTileLayer } from './ColorizedTileLayer'
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
      <ColorizedTileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        sourceUrl="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        replaceColor={[244, 186, 87]}
        matchColor={[170, 211, 223]}
        tolerance={8}
        subdomains={['a', 'b', 'c']}
        noWrap
        bounds={AppConfig.worldBounds as LatLngBoundsExpression}
      />
      {options.children}
    </MapContainer>
  )
}
