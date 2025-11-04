import React from 'react'

import { PeerStats } from '#interfaces/peerStats'

interface BottomRightStatsProps {
  stats?: PeerStats
}

export const BottomRightStats: React.FC<BottomRightStatsProps> = ({ stats }) => {
  const neutrino = stats?.neutrino.total ?? 0
  const flokicoind = stats?.flokicoind.total ?? 0
  const total = neutrino + flokicoind

  return (
    <div className="pointer-events-auto absolute bottom-0 right-0 flex gap-0" style={{ zIndex: 1000 }}>
      {/* Total */}
      <div className="shadow-md">
        <div className="inline-flex overflow-hidden  rounded-tl-md">
          <span className="bg-gray-800 px-2 py-1 text-xs font-medium text-white">Total</span>
          <span className="bg-emerald-600 px-2 py-1 text-xs font-semibold text-white">{total}</span>
        </div>
      </div>

      {/* Neutrino */}
      <div className="shadow-md">
        <div className="inline-flex overflow-hidden">
          <span className="bg-gray-800 px-2 py-1 text-xs font-medium text-white">Neutrino</span>
          <span className="bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-950">{neutrino}</span>
        </div>
      </div>

      {/* Flokicoind */}
      <div className="shadow-md">
        <div className="inline-flex overflow-hidden">
          <span className="bg-gray-800 px-2 py-1 text-xs font-medium text-white">Flokicoind</span>
          <span className="bg-amber-600 px-2 py-1 text-xs font-semibold text-white">{flokicoind}</span>
        </div>
      </div>
    </div>
  )
}

export default BottomRightStats
