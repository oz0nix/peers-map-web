export type ResourceItem =
  | ({ title: string; href: string } & { iconName: string; iconUrl?: never })
  | ({ title: string; href: string } & { iconUrl: string; iconName?: never })

export interface ResourceSection {
  title: string
  items: ResourceItem[]
}

export interface ResourcesConfig {
  sections: ResourceSection[]
}
