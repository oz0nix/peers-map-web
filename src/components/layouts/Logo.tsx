import { AppConfig } from '#src/config/AppConfig'

const Logo = () => (
  <div className="flex items-center">
    {/* Size driven by AppConfig.ui.topBarIconSize to match header */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/logo.svg" alt="Logo" className="w-auto" style={{ height: AppConfig.ui.topBarIconSize }} />
  </div>
)

export default Logo
