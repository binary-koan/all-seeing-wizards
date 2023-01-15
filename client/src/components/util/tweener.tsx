import { useTick } from "@inlet/react-pixi"
import { flatten } from "lodash"
import React, { useEffect, useRef, useState } from "react"

const TARGET_FPS = 60

export type Interpolator = (elapsedFrames: number, options: TweenOptions) => number

export const linearInterpolator: Interpolator = (elapsedFrames, { from, to, framesDuration }) => {
  const gradient = (to - from) / framesDuration

  return from + elapsedFrames * gradient
}

export interface TweenedPropOptions {
  duration: number
}

export default function tweener<BaseProps>(
  Component: React.ComponentType<BaseProps>,
  propsToTween: { [key: string]: TweenedPropOptions }
): React.FC<BaseProps> {
  return props => {
    const tweens = useRef<{ [prop: string]: Tween }>({})
    const [state, setState] = useState<{ [key: string]: any }>({ ...props })

    useTick((deltaTime: number) => {
      for (const [name, tween] of Object.entries(tweens.current)) {
        if (tween.finished) {
          delete tweens.current[name]
        } else {
          tween.tick(deltaTime)
        }
      }
    })

    useEffect(() => {
      const newState: { [key: string]: any } = state

      for (const [name, value] of Object.entries(props)) {
        if (
          Object.keys(propsToTween).includes(name) &&
          state[name] != null &&
          typeof value === "number"
        ) {
          tweens.current[name] = new Tween({
            from: state[name],
            to: value,
            duration: propsToTween[name].duration,
            interpolate: linearInterpolator,
            update: newValue => setState(current => ({ ...current, [name]: newValue } as any))
          })
        } else {
          newState[name] = value
        }
      }

      setState(newState)
    }, flatten(Object.entries(props)))

    return <Component {...(state as any)} />
  }
}

interface TweenOptions {
  from: number
  to: number
  framesDuration: number
}

class Tween {
  private options: TweenOptions
  private currentValue: number
  private elapsedFrames: number
  private interpolate: Interpolator
  private update: (value: number) => void

  constructor({
    from,
    to,
    duration,
    interpolate,
    update
  }: {
    from: number
    to: number
    duration: number
    interpolate: Interpolator
    update: (value: number) => void
  }) {
    this.options = { from, to, framesDuration: duration / TARGET_FPS }
    this.currentValue = from
    this.elapsedFrames = 0
    this.interpolate = interpolate
    this.update = update
  }

  public get finished() {
    return this.elapsedFrames === this.options.framesDuration
  }

  public tick(deltaTime: number) {
    this.elapsedFrames = Math.min(this.elapsedFrames + deltaTime, this.options.framesDuration)

    const nextValue = this.interpolate(this.elapsedFrames, this.options)

    if (nextValue !== this.currentValue) {
      this.update(nextValue)
      this.currentValue = nextValue
    }
  }
}
