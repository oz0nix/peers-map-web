import {
  createElementObject,
  createPathComponent,
  extendContext,
  LeafletContextInterface,
} from '@react-leaflet/core'
import Leaflet, { LeafletMouseEventHandlerFn } from 'leaflet'

import 'leaflet.markercluster'

import { LucideProps } from 'lucide-react'
import React, { FunctionComponent } from 'react'

import { AppConfig } from '#lib/AppConfig'

import LeafletDivIcon from './LeafletDivIcon'
import MarkerIconWrapper from './LeafletMarker/MarkerIconWrapper'

type ClusterEvents = {
  onClick?: LeafletMouseEventHandlerFn
  onDblClick?: LeafletMouseEventHandlerFn
  onMouseDown?: LeafletMouseEventHandlerFn
  onMouseUp?: LeafletMouseEventHandlerFn
  onMouseOver?: LeafletMouseEventHandlerFn
  onMouseOut?: LeafletMouseEventHandlerFn
  onContextMenu?: LeafletMouseEventHandlerFn
}

type MarkerClusterControl = Leaflet.MarkerClusterGroupOptions & {
  children: React.ReactNode
  icon: FunctionComponent<LucideProps>
  color: string
  imageUrl?: string
} & ClusterEvents

const CreateMarkerClusterGroup = (props: MarkerClusterControl, context: LeafletContextInterface) => {
  const markerClusterGroup = new Leaflet.MarkerClusterGroup({
    removeOutsideVisibleBounds: false,
    spiderLegPolylineOptions: {
      className: 'hidden',
    },
    // zoomToBoundsOnClick: false,
    iconCreateFunction: cluster =>
      LeafletDivIcon({
        source: (
          <MarkerIconWrapper
            color={props.color}
            icon={props.icon}
            imageUrl={props.imageUrl}
            label={`${cluster.getChildCount()}`}
          />
        ) as unknown as Parameters<typeof import('react-dom/server').renderToString>[0],
        anchor: [AppConfig.ui.markerIconSize / 2, AppConfig.ui.markerIconSize / 2],
      }),
    ...props,
  })

  return createElementObject(
    markerClusterGroup,
    extendContext(context, { layerContainer: markerClusterGroup }),
  )
}

export const LeafletCluster = () =>
  createPathComponent<Leaflet.MarkerClusterGroup, MarkerClusterControl>(CreateMarkerClusterGroup)
