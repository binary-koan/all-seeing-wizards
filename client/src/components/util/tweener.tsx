import { withPixiApp } from "@inlet/react-pixi"
import React from "react"

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
) {
  type WrapperProps = BaseProps & { app: PIXI.Application }

  const Wrapper = class extends React.Component<WrapperProps> {
    private tweens: { [prop: string]: Tween }

    constructor(props: WrapperProps) {
      super(props)

      this.state = { ...(props as {}) }
      this.tweens = {}
      this.tick = this.tick.bind(this)
    }

    public componentWillMount() {
      this.props.app.ticker.add(this.tick)
    }

    public componentWillUnmount() {
      this.props.app.ticker.remove(this.tick)
    }

    public componentWillReceiveProps(props: WrapperProps) {
      for (const [name, value] of Object.entries(props)) {
        if (Object.keys(propsToTween).includes(name) && typeof value === "number") {
          this.tweens[name] = new Tween({
            from: (this.state as any)[name],
            to: value,
            duration: propsToTween[name].duration,
            interpolate: linearInterpolator,
            update: newValue => this.setState({ [name]: newValue })
          })
        } else {
          this.setState({ [name]: value })
        }
      }
    }

    public render() {
      return <Component {...this.state} />
    }

    private tick(deltaTime: number) {
      for (const [name, tween] of Object.entries(this.tweens)) {
        if (tween.finished) {
          delete this.tweens[name]
        } else {
          tween.tick(deltaTime)
        }
      }
    }
  }

  return withPixiApp(Wrapper)
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
