import { MenuItem } from '#interfaces/menuItem'
import { ResourcesConfig } from '#interfaces/resource'

export const sideMenu: MenuItem[] = [
  { title: 'Resources', iconName: 'Globe' },
  { title: 'Nodes', iconName: 'Info' },
]

export const resourcesConfig: ResourcesConfig = {
  sections: [
    {
      title: 'What is Flokicoin',
      items: [
        { title: 'About', href: 'https://docs.flokicoin.org/', iconName: 'Info' },
        {
          title: 'Wallets',
          href: 'https://docs.flokicoin.org/wallets/twallet',
          iconName: 'Wallet',
        },
      ],
    },
    {
      title: 'Blockchain',
      items: [
        { title: 'Mainnet', href: 'https://flokichain.info/', iconName: 'Globe' },
        { title: 'Testnet', href: 'https://testnet.flokichain.info/', iconName: 'Beaker' },
      ],
    },
    {
      title: 'Pool',
      items: [
        { title: 'Fpool', href: 'https://fpool.net/', iconName: 'Fish' },
        { title: 'ViaFLC', href: 'https://viaflc.com/', iconName: 'Waves' },
      ],
    },
    {
      title: 'Faucet',
      items: [{ title: 'Lokirace', href: 'https://lokirace.com/', iconName: 'Joystick' }],
    },
    {
      title: 'Community',
      items: [
        { title: 'Discord', href: 'https://discord.com/invite/MVYuF5KjxK', iconName: 'MessageCircle' },
        { title: 'X', href: 'https://x.com/flokicoin_dao', iconName: 'Twitter' },
        { title: 'Github', href: 'https://github.com/flokiorg', iconName: 'Github' },
      ],
    },
  ],
}
