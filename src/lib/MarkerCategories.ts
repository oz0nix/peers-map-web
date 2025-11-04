import { LocateFixed, LucideProps, Server, ServerCrash } from 'lucide-react'
import { FunctionComponent } from 'react'
import colors from 'tailwindcss/colors'

export enum Category {
  LOCATE = 0,
  CAT1 = 1,
  CAT2 = 2,
}

export interface MarkerCategoriesValues {
  name: string
  icon: FunctionComponent<LucideProps>
  color: string
  hideInMenu?: boolean
  imageUrl?: string
}

type MarkerCategoryType = {
  [key in Category]: MarkerCategoriesValues
}

const MarkerCategories: MarkerCategoryType = {
  [Category.LOCATE]: {
    name: 'User Location',
    icon: LocateFixed,
    color: colors.green[400],
    hideInMenu: false,
  },
  [Category.CAT1]: {
    name: 'Peer',
    icon: ServerCrash,
    color: colors.amber[500],
    imageUrl: '/hero.gif',
  },
  [Category.CAT2]: {
    name: 'Wallet Peer',
    icon: Server,
    color: colors.gray[600],
    imageUrl: '/coin.gif',
  },
}

export default MarkerCategories
