import { ArrowDown } from 'lucide-react'
import colors from 'tailwindcss/colors'

import { PeerStats } from '#interfaces/peerStats'
import { compareVersionsDesc } from '#lib/peers/parseSubVer'
import MarkerCategories, { Category } from '#lib/MarkerCategories'

interface SheetProps {
  open: boolean
  stats?: PeerStats
  onToggle?: () => void
}

const Badge = ({ children, color }: { children: React.ReactNode; color?: string }) => (
  <span
    className="ml-1 inline-flex items-center rounded-full px-2 py-0 text-xs font-semibold"
    style={{ color, borderColor: color, borderWidth: 1 }}
  >
    {children}
  </span>
)

const StatLine = ({ label, value, color }: { label: string; value: number | string; color?: string }) => (
  <div className="flex items-center justify-start  py-1">
    <span className="text-sm text-secondary">- {label} :</span>
    <Badge color={color}>{value}</Badge>
  </div>
)

const VersionsBlock = ({
  title,
  total,
  versions,
  titleColor,
  color,
}: {
  title: string
  total: number
  versions: Record<string, number>
  color: string
  titleColor?: string
}) => (
  <div className="rounded-md border border-light bg-white shadow-sm">
    <div
      className="mb-2 flex items-center justify-center bg-dark p-1 text-sm font-bold"
      style={{ color: titleColor ?? color }}
    >
      <div>
        <span>{title}</span>
        <Badge color={titleColor ?? color}>{total}</Badge>
      </div>
    </div>
    <div className="mt-2 space-y-1 p-3">
      {Object.entries(versions)
        .sort(([a], [b]) => compareVersionsDesc(a, b))
        .map(([ver, count]) => (
          <StatLine key={ver} label={ver} value={count} color={color} />
        ))}
    </div>
  </div>
)

export const Sheet = ({ open, stats, onToggle }: SheetProps) => {
  const neutrinoColor = MarkerCategories[Category.CAT2].color
  const flokicoindColor = MarkerCategories[Category.CAT1].color
  return (
    <div
      className={`pointer-events-auto absolute bottom-0 left-0 w-full transition-transform duration-200 ${
        open ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ zIndex: 400, position: 'absolute' }}
    >
      <div className="relative mx-auto max-w-4xl border-t border-light bg-white/95 p-3 backdrop-blur">
        {open && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded rounded-b-none border border-b-0 border-light bg-white p-2 text-dark shadow-md"
            style={{ zIndex: 401 }}
          >
            <ArrowDown size={16} />
          </button>
        )}
        <div className="mb-2 flex items-center gap-2">
          <div className="text-base font-semibold text-dark">Lokichain Nodes</div>
          <Badge color="#16a34a">
            <span className="font-bold">{stats?.total ?? 0}</span>
          </Badge>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <VersionsBlock
            title="Neutrino"
            total={stats?.neutrino.total ?? 0}
            versions={stats?.neutrino.versions ?? {}}
            color={neutrinoColor}
            titleColor={colors.gray[50]}
          />
          <VersionsBlock
            title="Flokicoind"
            total={stats?.flokicoind.total ?? 0}
            versions={stats?.flokicoind.versions ?? {}}
            color={flokicoindColor}
          />
        </div>
      </div>
    </div>
  )
}

export default Sheet
