import React, { useEffect, useState } from 'react'

import { NodeVersionResponse } from '#interfaces/version'
import { getNodeVersion } from '#services/VersionService'
import { AppConfig } from '#src/config/AppConfig'

export const BottomUpgradeNode: React.FC<{ wrapperClassName?: string }> = ({ wrapperClassName }) => {
  const [version, setVersion] = useState<NodeVersionResponse | undefined>(undefined)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const data = await getNodeVersion()
      if (!mounted) return
      setVersion(data)
    }
    load()
    // Optionally, re-check periodically (e.g., every 5 minutes)
    const id = setInterval(load, 5 * 60 * 1000)
    return () => {
      mounted = false
      clearInterval(id)
    }
  }, [])

  const targetName = version?.flokicoind?.name
  if (!targetName) return null
  const releaseUrl = `${AppConfig.goFlokicoinRepoUrl}/releases/tag/v${targetName}`

  return (
    <div
      className={wrapperClassName ?? 'pointer-events-auto absolute bottom-0 right-0 flex gap-0'}
      style={{ zIndex: 1000 }}
    >
      <div className="bottom-0 flex h-7 items-center rounded-l-md rounded-r-none bg-red-600 px-2 text-xs font-medium text-white md:rounded-b-none md:rounded-t-md">
        <span>Upgrade your Flokicoin Node to</span>
        <a
          href={releaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-gray-950 hover:opacity-90 focus:outline-none"
          title={`Open release v${targetName}`}
        >
          {targetName}
        </a>
      </div>
    </div>
  )
}

export default BottomUpgradeNode
