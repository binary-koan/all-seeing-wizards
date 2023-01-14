import { RecordFactory } from "../util/immutableExtras"
import { Duration } from "./duration"

export interface IncreaseDamageModifierType {
  name: "increaseDamage"
  amount: number
}
export interface ShieldModifierType {
  name: "shield"
}
export interface MirrorShieldModifierType {
  name: "mirrorShield"
}
export interface PreventActionsModifierType {
  name: "preventActions"
}
export interface IncreaseSpeedModifierType {
  name: "increaseSpeed"
  amount: number
}
export interface WraithModifierType {
  name: "wraith"
}
export interface ReduceDamageModifierType {
  name: "reduceDamage"
  amount: number
}

export type ModifierType =
  | IncreaseDamageModifierType
  | ShieldModifierType
  | MirrorShieldModifierType
  | PreventActionsModifierType
  | IncreaseSpeedModifierType
  | WraithModifierType
  | ReduceDamageModifierType

interface IModifier {
  type: ModifierType
  duration?: Duration
  oncePer?: Duration["type"]
  applied: boolean
}

const modifier = RecordFactory<IModifier>({
  type: { name: "shield" },
  applied: false
})

export class Modifier extends modifier implements IModifier {
  public readonly type: ModifierType
  public readonly duration?: Duration
  public readonly oncePer?: Duration["type"]
  public readonly applied: boolean

  constructor(config: Omit<IModifier, "applied"> & { applied?: boolean }) {
    super({ ...config, applied: config.applied || false })
  }

  public advance(advancementType: Duration["type"]) {
    const newDuration = this.duration?.shorten(advancementType, 1)

    const withUpdatedDuration =
      newDuration === this.duration
        ? this
        : new Modifier({ type: this.type, duration: newDuration, applied: this.applied })

    if (this.oncePer === advancementType) {
      return withUpdatedDuration.set("applied", false)
    } else {
      return withUpdatedDuration
    }
  }
}
