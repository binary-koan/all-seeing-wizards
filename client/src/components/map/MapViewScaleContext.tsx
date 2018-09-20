import React from "react"

interface MapViewScale {
  viewportWidth: number
  viewportHeight: number
  mapPadding: number
  mapWidth: number
  mapHeight: number
  tileSize: { width: number; height: number }
  mapPosition: ({ x, y }: { x: number; y: number }) => { x: number; y: number }
  mapSize: (
    { width, height }?: { width: number; height: number }
  ) => { width: number; height: number }
}

const MapViewScaleContext = React.createContext<MapViewScale>(
  buildMapViewScale({
    viewportWidth: 0,
    viewportHeight: 0,
    mapPadding: 0,
    mapWidth: 0,
    mapHeight: 0,
    tileSize: 0
  })
)

export function buildMapViewScale({
  viewportWidth,
  viewportHeight,
  mapPadding,
  mapWidth,
  mapHeight,
  tileSize
}: {
  viewportWidth: number
  viewportHeight: number
  mapPadding: number
  mapWidth: number
  mapHeight: number
  tileSize: number
}): MapViewScale {
  return {
    viewportWidth,
    viewportHeight,
    mapPadding,
    mapWidth,
    mapHeight,
    tileSize: { width: tileSize, height: tileSize },
    mapPosition({ x, y }) {
      return { x: mapPadding + x * tileSize, y: mapPadding + y * tileSize }
    },
    mapSize(size) {
      if (!size) {
        return { width: mapWidth - mapPadding * 2, height: mapHeight - mapPadding * 2 }
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
