import { List, fromJS } from "immutable"
import { ImmutableGameObject, RecordFactory } from "../../immutableExtras"
import { Board } from "./board"
import { Card } from "./card"
import { Player } from "./player"

interface IDeck {
  availableCards: List<Card>
  discardedCards: List<Card>
}

const deck = RecordFactory<IDeck>({
  availableCards: List(),
  discardedCards: List()
})

export class Deck extends deck implements IDeck {
  availableCards: List<Card>
  discardedCards: List<Card>

  constructor(config: IDeck) {
    super(config)
  }
}

//

export type ChangeStateOperation =
  | "playersChanged"
  | "playerConnectionStateChanged"
  | "playerHandChanged"
  | "cardDiscarded"

interface IGameState {
  version: number
  id: string
  players: List<Player>
  board: Board
  deck: Deck
  operationsSinceLastSave: List<ChangeStateOperation>
}

const gameState = RecordFactory<IGameState>({
  version: 0,
  id: "",
  players: List(),
  board: new Board({ tiles: List(), objects: List(), width: 0, height: 0 }),
  deck: new Deck({ availableCards: List(), discardedCards: List() }),
  operationsSinceLastSave: List()
})

export class GameState extends gameState implements IGameState {
  version: number
  id: string
  players: List<Player>
  board: Board
  deck: Deck
  operationsSinceLastSave: List<ChangeStateOperation>

  constructor(config: IGameState) {
    super(config)
  }
}
