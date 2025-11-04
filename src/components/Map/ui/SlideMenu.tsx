import * as Icons from 'lucide-react'
import React, { useMemo, useState } from 'react'

import { resourcesConfig } from '#components/Map/menu/sideMenu'
import { PeerStats } from '#interfaces/peerStats'
import { ResourceItem } from '#interfaces/resource'
import { AppConfig } from '#lib/AppConfig'

type TabKey = 'infos' | 'nodes'

interface SlideMenuProps {
  stats?: PeerStats
}

const IconRenderer: React.FC<{ iconName?: string; iconUrl?: string; size?: number }> = ({
  iconName,
  iconUrl,
  size = 16,
}) => {
  if (iconUrl) return <img src={iconUrl} alt="" className="h-4 w-4" />
  if (iconName) {
    const Icon = (Icons as any)[iconName]
    if (Icon) return <Icon size={size} />
  }
  return <Icons.Circle size={size} />
}

const NodesSummary: React.FC<{ stats?: PeerStats }> = ({ stats }) => {
  const neutrino = stats?.neutrino ?? { total: 0, versions: {} }
  const flokicoind = stats?.flokicoind ?? { total: 0, versions: {} }
  const total = stats?.total ?? neutrino.total + flokicoind.total
  return (
    <div className="text-white">
      <div className="m-4 text-lg font-bold">Lokichain Nodes</div>
      {/* Total card */}
      <div className="mb-3 rounded-xl bg-neutral-600 p-2">
        <div className="mb-1 flex items-center justify-center gap-2 text-center text-sm font-bold">
          <span>Total</span>
          <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs text-white">{total}</span>
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex items-center justify-between rounded-lg bg-gray-100 px-2 py-1 text-gray-950">
            <span>Neutrino</span>
            <span className="rounded-full border border-gray-950 px-2 text-xs ">{neutrino.total}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-[#ee990d] px-2 py-1">
            <span>Flokicoind</span>
            <span className="rounded-full border border-white/70 px-2 text-xs">{flokicoind.total}</span>
          </div>
        </div>
      </div>
      <div className="mb-3 grid grid-cols-1 gap-2">
        <div className="rounded-xl bg-neutral-600 p-2">
          <div className="mb-1 text-center text-sm font-bold">Neutrino</div>
          <div className="space-y-1 text-sm">
            {Object.entries(neutrino.versions)
              .sort(([a], [b]) => (a > b ? -1 : 1))
              .map(([ver, count]) => (
                <div
                  key={ver}
                  className="flex items-center justify-between rounded-lg bg-gray-100 px-2 py-1 text-gray-950"
                >
                  <span>- {ver}</span>
                  <span className="rounded-full border border-gray-950 px-2 text-xs">{count}</span>
                </div>
              ))}
            {Object.keys(neutrino.versions).length === 0 && (
              <div className="rounded-lg bg-gray-100 px-2 py-1 text-center opacity-80">No data</div>
            )}
          </div>
        </div>
        <div className="rounded-xl bg-neutral-600 p-2">
          <div className="mb-1 text-center text-sm font-bold" style={{ color: '#f59e0b' }}>
            Flokicoind
          </div>
          <div className="space-y-1 text-sm">
            {Object.entries(flokicoind.versions)
              .sort(([a], [b]) => (a > b ? -1 : 1))
              .map(([ver, count]) => (
                <div
                  key={ver}
                  className="flex items-center justify-between rounded-lg bg-[#ee990d] px-2 py-1"
                >
                  <span>- {ver}</span>
                  <span className="rounded-full border border-white/70 px-2 text-xs">{count}</span>
                </div>
              ))}
            {Object.keys(flokicoind.versions).length === 0 && (
              <div className="rounded-lg bg-[#ee990d] px-2 py-1 text-center opacity-80">No data</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const SlideMenu: React.FC<SlideMenuProps> = ({ stats }) => {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<TabKey | null>()

  const topOffset = useMemo(() => AppConfig.ui.topBarHeight ?? 0, [])

  const onCLose = () => {
    setTab(null)
    setOpen(false)
  }
  return (
    <div>
      {/* Slide container */}
      <div className={`floki-menu ${open ? 'open' : ''}`} style={{ zIndex: 10000, top: topOffset }}>
        {/* Content */}
        <div id="floki-scroll" className="floki-scroll">
          {tab === 'infos' ? (
            <div className="mt-4 px-2 pb-2 text-white">
              {resourcesConfig.sections.map(section => (
                <div key={section.title} className="mb-3">
                  <b className="mb-1 block text-[1.05rem]">{section.title}</b>
                  <div className="flex flex-col gap-2">
                    {section.items.map((item: ResourceItem) => (
                      <a
                        key={item.title}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="btnItem flex items-center gap-2 border"
                      >
                        <IconRenderer
                          iconName={'iconName' in item ? item.iconName : undefined}
                          iconUrl={'iconUrl' in item ? item.iconUrl : undefined}
                        />
                        {item.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-2 pb-3">
              <NodesSummary stats={stats} />
            </div>
          )}
        </div>

        {/* Rail buttons (attached to panel) */}
        <div className="floki-rail infos">
          <span
            role="button"
            tabIndex={0}
            className={`btNavigation menu menu-infos ${tab === 'infos' ? 'active' : ''}`}
            onClick={() => {
              setOpen(true)
              setTab('infos')
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setOpen(true)
                setTab('infos')
              }
            }}
          >
            <span className="inline-flex items-center gap-2">
              <Icons.ClipboardList size={16} />
              Resources
            </span>
          </span>
        </div>
        <div className="floki-rail nodes">
          <span
            role="button"
            tabIndex={0}
            className={`btNavigation menu menu-nodes ${tab === 'nodes' ? 'active' : ''}`}
            onClick={() => {
              setOpen(true)
              setTab('nodes')
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setOpen(true)
                setTab('nodes')
              }
            }}
          >
            <span className="inline-flex items-center gap-2">
              <Icons.Hexagon size={16} />
              Nodes
            </span>
          </span>
        </div>
        {/* Close */}
        {open && (
          <button type="button" className="close" onClick={onCLose} aria-label="Close">
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default SlideMenu
