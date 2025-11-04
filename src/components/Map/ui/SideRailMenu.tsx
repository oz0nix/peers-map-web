import * as Icons from 'lucide-react'
import React from 'react'

import { sideMenu } from '../menu/sideMenu'

interface SideRailMenuProps {
  onOpenNodesSummary: () => void
  onOpenResources: () => void
}

type IconComp = React.ComponentType<{ size?: number; className?: string }>

const RailButton: React.FC<{ label: string; Icon?: IconComp; onClick?: () => void } & { href?: string }> = ({
  label,
  Icon,
  onClick,
  href,
}) => {
  const content = (
    <div className="flex rotate-[-90deg] transform items-center gap-2 text-white">
      {Icon ? <Icon size={16} /> : null}
      <span className="text-sm font-semibold">{label}</span>
    </div>
  )
  const cls =
    'flex h-28 w-8 items-center justify-center rounded-b-lg rounded-t-lg bg-[#1b3a2b] shadow-md ring-1 ring-black/10 hover:bg-[#21513a]'
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls} title={label}>
      {content}
    </a>
  ) : (
    <button type="button" className={cls} title={label} onClick={onClick}>
      {content}
    </button>
  )
}

export const SideRailMenu: React.FC<SideRailMenuProps> = ({ onOpenNodesSummary, onOpenResources }) => (
  <div
    className="pointer-events-auto absolute left-2 top-1/2 flex -translate-y-1/2 flex-col gap-2"
    style={{ zIndex: 402 }}
  >
    {sideMenu.map(item => {
      const Icon = (item.iconName && (Icons as any)[item.iconName]) || undefined
      const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (item.url) return
        const t = item.title.toLowerCase()
        if (t.includes('resource')) onOpenResources()
        else if (t.includes('node')) onOpenNodesSummary()
      }
      const cls =
        'flex h-28 w-8 items-center justify-center rounded-b-lg rounded-t-lg bg-[#1b3a2b] shadow-md ring-1 ring-black/10 hover:bg-[#21513a]'
      const content = (
        <div className="flex rotate-[-90deg] transform items-center gap-2 text-white">
          {Icon ? <Icon size={16} /> : null}
          <span className="text-sm font-semibold">{item.title}</span>
        </div>
      )
      return item.url ? (
        <a
          key={item.title}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className={cls}
          title={item.title}
          onClick={handleClick}
        >
          {content}
        </a>
      ) : (
        <button key={item.title} type="button" className={cls} title={item.title} onClick={handleClick}>
          {content}
        </button>
      )
    })}
  </div>
)

export default SideRailMenu
