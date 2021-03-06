import { List } from "immutable"
import clamp from "../util/clamp"
import { RecordFactory } from "../util/immutableExtras"
import { Character } from "./character"
import { DirectionalPoint } from "./directionalPoint"
import { Duration } from "./duration"
import { Hand } from "./hand"
import { Modifier, ModifierType } from "./modifier"

export const MAX_PLAYER_HP = 5

interface IPlayer {
  id: string
  character: Character
  hp: number
  position: DirectionalPoint
  lastPosition?: DirectionalPoint
  hand: Hand
  connected: boolean
  modifiers: List<Modifier>
}

const player = RecordFactory<IPlayer>({
  id: "",
  character: new Character({ id: "", name: "", type: "" }),
  hp: MAX_PLAYER_HP,
  position: new DirectionalPoint({ x: 0, y: 0, facing: "north" }),
  lastPosition: undefined,
  hand: Hand.empty(),
  connected: false,
  modifiers: List()
})

export class Player extends player implements IPlayer {
  public readonly id: string
  public readonly character: Character
  public readonly hp: number
  public readonly position: DirectionalPoint
  public readonly lastPosition?: DirectionalPoint
  public readonly hand: Hand
  public readonly connected: boolean
  public readonly modifiers: List<Modifier>

  constructor(config: IPlayer) {
    super(config)
  }

  public get knockedOut() {
    return this.hp <= 0
  }

  public updateHp(by: number) {
    return this.set("hp", clamp(this.hp + by, 0, MAX_PLAYER_HP))
  }

  public updatePosition(position: DirectionalPoint) {
    return this.set("lastPosition", this.position).set("position", position)
  }

  public addModifier(modifier: Modifier) {
    return this.set("modifiers", this.modifiers.push(modifier))
  }

  public hasModifier(typeName: ModifierType["name"]) {
    return this.modifiers.find(modifier => modifier.type.name === typeName) != null
  }

  public advanceModifiers(advancementType: Duration["type"]) {
    return this.set(
      "modifiers",
      this.modifiers
        .map(modifier => modifier.advance(advancementType))
        .filter(modifier => !modifier.duration.expired)
    )
  }

  public clearModifiers() {
    return this.set("modifiers", List())
  }

  public updateHand(newHand: Hand) {
    return this.set("hand", newHand)
  }

  public connect() {
    return this.set("connected", true)
  }

  public disconnect() {
    return this.set("connected", false)
  }

  public setCharacter(character: Character) {
    if (this.character?.id) throw new Error("Character is already set for this player")

    return this.set("character", character)
  }
}
