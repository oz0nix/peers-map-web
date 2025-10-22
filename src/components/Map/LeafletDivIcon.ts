import Leaflet, { PointExpression } from 'leaflet'
import { renderToString } from 'react-dom/server'

interface divIconValues {
  source: Parameters<typeof renderToString>[0]
  anchor: PointExpression
}

const LeafletDivIcon = ({ source, anchor }: divIconValues) =>
  Leaflet?.divIcon({
    html: renderToString(source),
    iconAnchor: anchor,
  })

export default LeafletDivIcon
