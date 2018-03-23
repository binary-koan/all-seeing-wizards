import { List } from "immutable"
import { RecordFactory } from "../util/immutableExtras"
import { Card } from "./card"
import { Character } from "./character"
import { DirectionalPoint } from "./directionalPoint"
import { Duration } from "./duration"
import { Hand } from "./hand"
import { Modifier } from "./modifier"

export const MAX_PLAYER_HP = 5

interface IPlayer {
  id: string
  character: Character
  hp: number
  position: DirectionalPoint
  hand: Hand
  connected: boolean
  modifiers: List<Modifier>
}

const player = RecordFactory<IPlayer>({
  id: "",
  character: new Character({ name: "", type: "" }),
  hp: 0,
  position: new DirectionalPoint({ x: 0, y: 0, facing: "north" }),
  hand: Hand.empty(),
  connected: false,
  modifiers: List()
})

export class Player extends player implements IPlayer {
  public readonly id: string
  public readonly character: Character
  public readonly hp: number
  public readonly position: DirectionalPoint
  public readonly hand: Hand
  public readonly connected: boolean
  public readonly modifiers: List<Modifier>

  constructor(config: IPlayer) {
    super(config)
  }

  public get knockedOut() {
    return this.hp <= 0
  }
}
