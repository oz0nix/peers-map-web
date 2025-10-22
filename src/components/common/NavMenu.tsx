import { Github } from 'lucide-react'
import colors from 'tailwindcss/colors'

import { AppConfig, NavMenuVariant } from '#lib/AppConfig'

import NavMenuItem from './NavMenuItem'

interface NavMenuProps {
  variant?: NavMenuVariant
}

const NavMenu = ({ variant = NavMenuVariant.INTRO }: NavMenuProps) => {
  const navIconSize =
    variant === NavMenuVariant.TOPNAV ? AppConfig.ui.topBarIconSize : AppConfig.ui.menuIconSize

  const listStyle =
    variant === NavMenuVariant.TOPNAV
      ? `flex text-white gap-4 text-lg text-white text-sm md:text-base`
      : `flex flex-col justify-between gap-1 w-fit text-primary`

  return (
    <ul className={`${listStyle}`}>
      <NavMenuItem href={AppConfig.flcUrl} label="What is Flokicoin?" external color={colors.amber[500]} />
      <NavMenuItem href={AppConfig.githubUrl} label="" icon={<Github size={navIconSize} />} external />
    </ul>
  )
}

export default NavMenu
