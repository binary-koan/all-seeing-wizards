import React from "react"

interface MapViewScale {
  width: number
  height: number
  tileSize: number
}

const MapViewScaleContext = React.createContext<MapViewScale>({
  width: 0,
  height: 0,
  tileSize: 0
})

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
