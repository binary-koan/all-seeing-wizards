import { List, fromJS } from "immutable"
import { ImmutableGameObject, RecordFactory } from "../../immutableExtras"
import { DirectionalPoint } from "./positioning"
import { Duration } from "./duration"
import { Card } from "./card"

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
  cards: List<Card>
  pickedIndexes: List<number>

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
  type: ModifierType
  duration: Duration

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
  type: string
  name: string

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
  id: string
  character: Character
  hp: number
  position: DirectionalPoint
  hand: Hand
  connected: boolean
  modifiers: List<Modifier>

  constructor(config: IPlayer) {
    super(config)
  }
}
