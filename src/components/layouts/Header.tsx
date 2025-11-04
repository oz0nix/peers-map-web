import Logo from '#components/layouts/Logo'
import { NavMenuVariant } from '#lib/AppConfig'

import NavMenu from '../common/NavMenu'

const Header = () => (
  <div
    className="absolute left-0 top-0 flex h-20 w-full items-center bg-neutral-900 p-3 shadow"
    style={{ zIndex: 1000 }}
  >
    <div className="flex w-full justify-between">
      <Logo />
      <div className="flex flex-col justify-center">
        <NavMenu variant={NavMenuVariant.TOPNAV} />
      </div>
    </div>
  </div>
)

export default Header
