import { List, Map } from "immutable"
import { RecordFactory } from "../util/immutableExtras"
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
  public readonly availableCards: List<Card>
  public readonly discardedCards: List<Card>

  constructor(config: IDeck) {
    super(config)
  }

  public withCardsDiscarded(cards: List<Card>) {
    return this.set("discardedCards", this.discardedCards.concat(cards).toList())
  }

  public recycleDiscardedCards() {
    // TODO is this enough of a shuffle?
    return this.set("availableCards", this.discardedCards.sortBy(Math.random)).set(
      "discardedCards",
      List()
    )
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
  players: Map<string, Player>
  board: Board
  deck: Deck
  operationsSinceLastSave: List<ChangeStateOperation>
}

const gameState = RecordFactory<IGameState>({
  version: 0,
  id: "",
  players: Map(),
  board: new Board({ tiles: List(), objects: List(), width: 0, height: 0 }),
  deck: new Deck({ availableCards: List(), discardedCards: List() }),
  operationsSinceLastSave: List()
})

export class GameState extends gameState implements IGameState {
  public readonly version: number
  public readonly id: string
  public readonly players: Map<string, Player>
  public readonly board: Board
  public readonly deck: Deck
  public readonly operationsSinceLastSave: List<ChangeStateOperation>

  constructor(config: IGameState) {
    super(config)
  }
}