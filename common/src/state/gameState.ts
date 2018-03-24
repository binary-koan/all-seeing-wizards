import { List, Map } from "immutable"
import { RecordFactory } from "../util/immutableExtras"
import { Board } from "./board"
import { Card } from "./card"
import { Deck } from "./deck"
import { Player } from "./player"

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
  board: new Board({ tiles: List(), objects: List() }),
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

  public player(id: string) {
    return this.players.get(id)
  }

  public updatePlayer(player: Player) {
    return this.setIn(["players", player.id], player)
  }
}
