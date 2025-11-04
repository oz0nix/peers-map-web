import twConfig from '#root/tailwind.config'

type TailwindThemeLike = {
  colors?: Record<string, string>
  extend?: { [key: string]: unknown; colors?: Record<string, string> }
}

type TailwindConfigLike = {
  theme?: TailwindThemeLike
}

const getColors = (cfg: TailwindConfigLike): Record<string, string> | undefined =>
  cfg?.theme?.colors ?? cfg?.theme?.extend?.colors

export const twColor = (color: string): string | undefined => {
  // Cast through unknown to satisfy TS structural typing where extra keys exist
  const colors = getColors(twConfig as unknown as TailwindConfigLike)
  return colors ? colors[color] : undefined
}
