import { ArrowUp } from 'lucide-react'

import { AppConfig } from '#src/config/AppConfig'

interface BottomToggleButtonProps {
  onClick: () => void
}

export const BottomToggleButton = ({ onClick }: BottomToggleButtonProps) => (
  <button
    type="button"
    style={{ zIndex: 401 }}
    className="button absolute bottom-3 left-1/2 -translate-x-1/2 rounded border border-light bg-white p-2 text-dark shadow-md"
    onClick={onClick}
  >
    <ArrowUp size={AppConfig.ui.mapIconSize} />
  </button>
)

export default BottomToggleButton
