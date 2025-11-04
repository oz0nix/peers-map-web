import { Github } from 'lucide-react'
import Link from 'next/link'
import colors from 'tailwindcss/colors'

import Logo from '#components/layouts/Logo'
import { AppConfig } from '#lib/AppConfig'

const Header = () => (
  <div
    className="absolute left-0 top-0 w-full bg-neutral-900 px-3 shadow"
    style={{ zIndex: 1000, height: AppConfig.ui.topBarHeight }}
  >
    <div className="relative flex h-full items-center">
      {/* Left: Logo */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <Logo />
      </div>
      {/* Right: CTA + GitHub */}
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-3">
        <Link
          href={AppConfig.flcUrl}
          target="_blank"
          className="font-medium"
          style={{ color: colors.amber[500] }}
        >
          What is Flokicoin?
        </Link>
        <Link href={AppConfig.githubUrl} target="_blank" aria-label="GitHub" className="text-white">
          <Github size={24} />
        </Link>
      </div>
    </div>
  </div>
)

export default Header
