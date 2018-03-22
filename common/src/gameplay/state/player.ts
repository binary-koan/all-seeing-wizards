import { List } from "immutable"
import { ImmutableGameObject, RecordFactory } from "../../immutableExtras"
import { Card } from "./card"
import { Duration } from "./duration"
import { DirectionalPoint } from "./positioning"

export const MAX_PLAYER_HP = 5

interface IHand {
  cards: List<Card>
  pickedIndexes: List<number>
}

const hand = RecordFactory<IHand>({
  cards: List(),
  pickedIndexes: List()
})

export class Hand extends hand implements IHand {
  public readonly cards: List<Card>
  public readonly pickedIndexes: List<number>

  constructor(config: IHand) {
    super(config)
  }
}

//

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
}

//

interface ICharacter {
  name: string
  type: string
}

const character = RecordFactory<ICharacter>({
  name: "",
  type: ""
})

export class Character extends character implements ICharacter {
  public readonly type: string
  public readonly name: string

  constructor(config: ICharacter) {
    super(config)
  }
}

//

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
  hand: new Hand({ cards: List(), pickedIndexes: List() }),
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
}
