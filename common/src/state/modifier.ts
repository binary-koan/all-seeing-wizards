import { RecordFactory } from "../util/immutableExtras"
import { Duration } from "./duration"

export type ModifierType =
  | { name: "increaseDamage"; amount: number }
  | { name: "shield" }
  | { name: "mirrorShield" }
  | { name: "preventActions" }

interface IModifier {
  type: ModifierType
  duration: Duration
}

const modifier = RecordFactory<IModifier>({
  type: { name: "shield" },
  duration: new Duration("action", 0)
})

export class Modifier extends modifier implements IModifier {
  public readonly type: ModifierType
  public readonly duration: Duration

  constructor(config: IModifier) {
    super(config)
  }

  public advance(advancementType: Duration["type"]) {
    const newDuration = this.duration.shorten(advancementType, 1)

    if (newDuration === this.duration) {
      return this
    } else {
      return new Modifier({ type: this.type, duration: newDuration })
    }
  }
}
