import Leaflet from 'leaflet'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import Header from '#components/layouts/Header'
import { PeerStats } from '#interfaces/peerStats'
import { PlacesType } from '#interfaces/places'
import { AppConfig } from '#lib/AppConfig'
import MarkerCategories, { Category } from '#lib/MarkerCategories'
import { computePeerStats, mapPeersToPlaces } from '#lib/peers/parseSubVer'
import { getPeersRaw } from '#services/PeerService'

import LeafleftMapContextProvider from './LeafletMapContextProvider'
import { BottomRightStats } from './ui/BottomRightStats'
import { SlideMenu } from './ui/SlideMenu'
import useMapContext from './useMapContext'
import useMarkerData from './useMarkerData'

const LeafletCluster = dynamic(async () => (await import('./LeafletCluster')).LeafletCluster(), {
  ssr: false,
})
const CenterToMarkerButton = dynamic(async () => (await import('./ui/CenterButton')).CenterButton, {
  ssr: false,
})
const CustomMarker = dynamic(async () => (await import('./LeafletMarker')).CustomMarker, {
  ssr: false,
})
const LocateButton = dynamic(async () => (await import('./ui/LocateButton')).LocateButton, {
  ssr: false,
})
const LeafletMapContainer = dynamic(async () => (await import('./LeafletMapContainer')).LeafletMapContainer, {
  ssr: false,
})

export interface ViewState {
  minLat: number
  minLng: number
  maxLat: number
  maxLng: number
  zoomLevel: number
}

const getViewState: (map?: Leaflet.Map) => ViewState | undefined = (map?: Leaflet.Map) => {
  if (!map) return undefined

  const bounds = map.getBounds()
  const zoomLevel = map.getZoom()

  return {
    minLat: bounds.getSouthWest().lat,
    minLng: bounds.getSouthWest().lng,
    maxLat: bounds.getNorthEast().lat,
    maxLng: bounds.getNorthEast().lng,
    zoomLevel,
  }
}

const LeafletMapInner = () => {
  const { map } = useMapContext()

  // we can use this to modify our query for locations
  const [_viewState, setViewState] = useState(getViewState(map))

  const {
    width: viewportWidth,
    height: viewportHeight,
    ref: viewportRef,
  } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 200,
  })

  // fetched peer markers + stats
  const [markerQueryResponse, setMarkerQueryResponse] = useState<PlacesType | undefined>(undefined)
  const [peerStats, setPeerStats] = useState<PeerStats | undefined>(undefined)
  const [isBottomOpen] = useState(false)
  const [isResourcesOpen] = useState(false)

  // initial fetch + polling every 5 minutes
  useEffect(() => {
    let isMounted = true
    const fetchPeers = async () => {
      const peers = await getPeersRaw()
      const places = mapPeersToPlaces(peers)
      const stats = computePeerStats(peers)
      if (!isMounted) return
      setMarkerQueryResponse(places)
      setPeerStats(stats)
    }
    fetchPeers()
    const interval = setInterval(fetchPeers, 5 * 60 * 1000)
    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (!map) return undefined

    // you should debounce that by only changing when the map stops moving
    map?.on('moveend', () => {
      setViewState(getViewState(map))
    })

    // cleanup
    return () => {
      map.off()
    }
  }, [map])

  const { clustersByCategory, allMarkersBoundCenter } = useMarkerData({
    locations: markerQueryResponse,
    map,
    viewportWidth,
    viewportHeight,
  })

  const isLoading = !map || !viewportWidth || !viewportHeight

  /** optionally fit to markers on load */
  useEffect(() => {
    if (!allMarkersBoundCenter || !map || !AppConfig.fitToMarkersOnLoad) return

    const moveEnd = () => {
      map.off('moveend', moveEnd)
    }

    map.flyTo(allMarkersBoundCenter.centerPos, allMarkersBoundCenter.minZoom, { animate: false })
    map.once('moveend', moveEnd)
  }, [allMarkersBoundCenter, map])

  return (
    <div className="absolute h-full w-full overflow-hidden" ref={viewportRef}>
      <Header />
      <div
        className={`absolute left-0 w-full transition-opacity ${isLoading ? 'opacity-0' : 'opacity-1 '}`}
        style={{
          top: AppConfig.ui.topBarHeight,
          width: viewportWidth ?? '100%',
          height: viewportHeight ? viewportHeight - AppConfig.ui.topBarHeight : '100%',
        }}
      >
        {allMarkersBoundCenter && clustersByCategory && (
          <LeafletMapContainer
            center={AppConfig.baseCenter}
            zoom={AppConfig.initialZoom}
            maxZoom={AppConfig.maxZoom}
            minZoom={AppConfig.minZoom}
          >
            {!isLoading ? (
              <>
                <CenterToMarkerButton
                  center={allMarkersBoundCenter.centerPos}
                  zoom={allMarkersBoundCenter.minZoom}
                />
                <LocateButton />
                <SlideMenu stats={peerStats} />
                <BottomRightStats stats={peerStats} />
                {Object.values(clustersByCategory).map(item => (
                  <LeafletCluster
                    key={item.category}
                    icon={MarkerCategories[item.category as Category].icon}
                    color={MarkerCategories[item.category as Category].color}
                    imageUrl={MarkerCategories[item.category as Category].imageUrl}
                    chunkedLoading
                  >
                    {item.markers.map(marker => (
                      <CustomMarker place={marker} key={marker.id} />
                    ))}
                  </LeafletCluster>
                ))}
              </>
            ) : (
              // we have to spawn at least one element to keep it happy
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <></>
            )}
          </LeafletMapContainer>
        )}
      </div>
    </div>
  )
}

// pass through to get context in <MapInner>
const Map = () => (
  <LeafleftMapContextProvider>
    <LeafletMapInner />
  </LeafleftMapContextProvider>
)

export default Map
