import * as Icons from 'lucide-react'
import React from 'react'

import { ResourceItem, ResourcesConfig } from '#interfaces/resource'

import { resourcesConfig } from '../../../config/sideMenu'

interface ResourcesPanelProps {
  open: boolean
  onClose: () => void
  config?: ResourcesConfig
}

const IconRenderer: React.FC<{ iconName?: string; iconUrl?: string }> = ({ iconName, iconUrl }) => {
  if (iconUrl) return <img src={iconUrl} alt="" className="h-4 w-4" />
  if (iconName) {
    const Icon = (Icons as any)[iconName]
    if (Icon) return <Icon size={16} />
  }
  return <Icons.Circle size={12} />
}

export const ResourcesPanel: React.FC<ResourcesPanelProps> = ({ open, onClose, config }) => {
  const cfg = config ?? resourcesConfig
  return (
    <div
      className={`pointer-events-auto absolute left-2 top-2 w-72 max-w-[80vw] translate-x-0 rounded-xl border border-black/10 bg-white/95 shadow-xl backdrop-blur-sm transition-transform ${
        open ? 'opacity-100' : 'pointer-events-none -translate-x-[110%] opacity-0'
      }`}
      style={{ zIndex: 403 }}
    >
      <div className="flex items-center justify-between rounded-t-xl bg-[#1b3a2b] px-4 py-3 text-white">
        <button
          type="button"
          className="rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto p-3">
        {cfg.sections.map(section => (
          <div key={section.title} className="mb-3">
            <div className="mb-2 text-sm font-semibold text-gray-800">{section.title}</div>
            <div className="flex flex-col gap-2">
              {section.items.map((item: ResourceItem) => (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-lg bg-[#E8F1EA] px-3 py-2 text-sm text-gray-900 ring-1 ring-black/5 hover:bg-[#e3edde]"
                >
                  <span className="flex items-center gap-2">
                    <IconRenderer
                      iconName={'iconName' in item ? item.iconName : undefined}
                      iconUrl={'iconUrl' in item ? item.iconUrl : undefined}
                    />
                    {item.title}
                  </span>
                  <Icons.ExternalLink size={14} className="text-gray-500" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResourcesPanel
