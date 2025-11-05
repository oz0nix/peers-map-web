import React from 'react'

import { PeerStats } from '#interfaces/peerStats'

interface BottomRightStatsProps {
  stats?: PeerStats
  wrapperClassName?: string
}

export const BottomRightStats: React.FC<BottomRightStatsProps> = ({ stats, wrapperClassName }) => {
  const neutrino = stats?.neutrino.total ?? 0
  const flokicoind = stats?.flokicoind.total ?? 0
  const total = stats?.total ?? neutrino + flokicoind

  return (
    <div
      className={wrapperClassName ?? 'pointer-events-auto absolute bottom-0 right-0 flex gap-0'}
      style={{ zIndex: 1000 }}
    >
      {/* Total */}
      <div className="bottom-0 flex  items-center rounded-tl-md bg-green-600 px-2 py-1 text-xs font-medium text-white">
        <span>Total</span>
        <span className="ml-2 rounded-full bg-white px-2  text-xs font-semibold text-green-700">{total}</span>
      </div>

      {/* Flokicoind */}
      <div className="bottom-0 flex  items-center bg-amber-600 px-2 py-1 text-xs font-medium text-white">
        <span>Full Nodes</span>
        <span className="ml-2 rounded-full bg-white px-2 text-xs font-semibold text-amber-700">
          {flokicoind}
        </span>
      </div>

      {/* Neutrino */}
      <div className="bottom-0 flex items-center bg-white px-2 py-1 text-xs font-medium text-gray-950">
        <span>Light Nodes</span>
        <span className="ml-2 rounded-full border border-gray-300 bg-white px-2 text-xs font-semibold text-gray-950">
          {neutrino}
        </span>
      </div>
    </div>
  )
}

export default BottomRightStats
