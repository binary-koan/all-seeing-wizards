import React from "react"

interface MapViewScale {
  realPadding: number
  realWidth: number
  realHeight: number
  tileSize: { width: number; height: number }
  tilePosition: ({ x, y }: { x: number; y: number }) => { x: number; y: number }
  areaSize: (
    { width, height }?: { width: number; height: number }
  ) => { width: number; height: number }
}

const MapViewScaleContext = React.createContext<MapViewScale>(
  buildMapViewScale({
    realPadding: 0,
    realWidth: 0,
    realHeight: 0,
    tileSize: 0
  })
)

export function buildMapViewScale({
  realPadding,
  realWidth,
  realHeight,
  tileSize
}: {
  realPadding: number
  realWidth: number
  realHeight: number
  tileSize: number
}): MapViewScale {
  return {
    realPadding,
    realWidth,
    realHeight,
    tileSize: { width: tileSize, height: tileSize },
    tilePosition({ x, y }) {
      return { x: realPadding + x * tileSize, y: realPadding + y * tileSize }
    },
    areaSize(size) {
      if (!size) {
        return { width: realWidth - realPadding * 2, height: realHeight - realPadding * 2 }
      }

      return { width: size.width * tileSize, height: size.height * tileSize }
    }
  }
}

export const Provider = MapViewScaleContext.Provider

export const Consumer = MapViewScaleContext.Consumer

export interface MapViewScaleProps {
  mapViewScale: MapViewScale
}

export function withMapViewScale<Props extends MapViewScaleProps>(
  Component: React.ComponentType<Props>
): React.SFC<Pick<Props, Exclude<keyof Props, keyof MapViewScaleProps>>> {
  return props => (
    <MapViewScaleContext.Consumer>
      {scale => <Component mapViewScale={scale} {...props} />}
    </MapViewScaleContext.Consumer>
  )
}
