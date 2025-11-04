import twConfig from '#root/tailwind.config'

type TailwindThemeLike = {
  colors?: Record<string, string>
  extend?: { colors?: Record<string, string> }
}

type TailwindConfigLike = {
  theme?: TailwindThemeLike
}

const getColors = (cfg: TailwindConfigLike): Record<string, string> | undefined =>
  cfg?.theme?.colors ?? cfg?.theme?.extend?.colors

export const twColor = (color: string): string | undefined => {
  const colors = getColors(twConfig as TailwindConfigLike)
  return colors ? colors[color] : undefined
}
