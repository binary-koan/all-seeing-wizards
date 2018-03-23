import { RecordFactory } from "../util/immutableExtras"
import { Duration } from "./duration"

type ModifierType =
  | { type: "increaseDamage"; amount: number }
  | "shield"
  | "mirrorShield"
  | "preventActions"

interface IModifier {
  type: ModifierType
  duration: Duration
}

const modifier = RecordFactory<IModifier>({
  type: "shield",
  duration: new Duration("action", 0)
})

export class Modifier extends modifier implements IModifier {
  public readonly type: ModifierType
  public readonly duration: Duration

  constructor(config: IModifier) {
    super(config)
  }

  public advance(advancementType: "action" | "turn") {
    if (this.duration.type !== advancementType) {
      return this
    }

    const newDuration = this.duration.shorten(1)

    if (newDuration.expired) {
      return undefined
    } else {
      return new Modifier({ type: this.type, duration: newDuration })
    }
  }
}
