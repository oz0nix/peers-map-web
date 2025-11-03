import { createLayerComponent, LeafletContextInterface } from '@react-leaflet/core'
import L from 'leaflet'

export interface ColorizedTileLayerOptions extends L.GridLayerOptions {
  // Template URL for the source tiles, e.g. 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  sourceUrl: string
  // RGB to match (default: OSM ocean #aad3df)
  matchColor?: [number, number, number]
  // New RGB to paint (e.g. brand color)
  replaceColor: [number, number, number]
  // Tolerance for matching +- each channel
  tolerance?: number
  // Optional subdomains list, defaults to ['a','b','c']
  subdomains?: string[]
}

type CreateTileDone = (err?: Error | null, tile?: HTMLCanvasElement) => void

interface GridLayerClass {
  new (options?: L.GridLayerOptions): L.GridLayer
}

interface GridLayerStatic {
  extend: (props: {
    createTile: (this: L.GridLayer, coords: L.Coords, done: CreateTileDone) => HTMLCanvasElement
  }) => GridLayerClass
}

const createColorizedLayer = (props: ColorizedTileLayerOptions, context: LeafletContextInterface) => {
  const match = props.matchColor ?? [170, 211, 223] // #aad3df
  const replace = props.replaceColor
  const [pr, pg, pb] = replace
  const tol = props.tolerance ?? 5
  const subs = props.subdomains ?? ['a', 'b', 'c']

  // Cycle subdomains for better cache distribution
  let subIndex = 0
  const pickSub = () => {
    const idx = subIndex
    subIndex = (subIndex + 1) % subs.length
    return subs[((idx % subs.length) + subs.length) % subs.length]
  }

  const Grid = (L.GridLayer as unknown as GridLayerStatic).extend({
    createTile(this: L.GridLayer, coords: L.Coords, done: CreateTileDone) {
      const tile = L.DomUtil.create('canvas', '') as HTMLCanvasElement
      tile.width = 256
      tile.height = 256
      const ctx = tile.getContext('2d') as CanvasRenderingContext2D
      const img = new Image()
      img.crossOrigin = 'anonymous'

      // Basic template replacement for {s},{z},{x},{y}
      const url = props.sourceUrl
        .replace('{s}', pickSub())
        .replace('{z}', String(coords.z))
        .replace('{x}', String(coords.x))
        .replace('{y}', String(coords.y))

      img.onload = () => {
        try {
          ctx.drawImage(img, 0, 0)
          const imgData = ctx.getImageData(0, 0, tile.width, tile.height)
          const { data } = imgData
          const [mr, mg, mb] = match

          for (let i = 0; i < data.length; i += 4) {
            const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]]

            if (a === 255 && Math.abs(r - mr) <= tol && Math.abs(g - mg) <= tol && Math.abs(b - mb) <= tol) {
              data[i] = pr
              data[i + 1] = pg
              data[i + 2] = pb
            }
          }

          ctx.putImageData(imgData, 0, 0)
          done(undefined, tile)
        } catch (e) {
          const err = e instanceof Error ? e : new Error(String(e))
          done(err, tile)
        }
      }

      img.onerror = () => done(new Error(`Tile failed to load: ${url}`), tile)
      img.src = url

      return tile
    },
  })

  const instance: L.GridLayer = new Grid({ ...props })
  return {
    instance,
    context,
  }
}

const updateColorizedLayer = (
  _instance: L.GridLayer,
  _props: ColorizedTileLayerOptions,
  _prevProps: ColorizedTileLayerOptions,
) => {
  // Nothing dynamic to update safely; re-render handled by react-leaflet lifecycle
}

export const ColorizedTileLayer = createLayerComponent<L.GridLayer, ColorizedTileLayerOptions>(
  createColorizedLayer,
  updateColorizedLayer,
)

export default ColorizedTileLayer
