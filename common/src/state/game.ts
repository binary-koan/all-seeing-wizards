import { List, Map } from "immutable"
import { RecordFactory } from "../util/immutableExtras"
import { Board } from "./board"
import { Card } from "./card"
import { Deck } from "./deck"
import { Player } from "./player"

interface IGame {
  id: string
  started: boolean
  players: Map<string, Player>
  board: Board
  deck: Deck
}

const game = RecordFactory<IGame>({
  id: "",
  started: false,
  players: Map(),
  board: new Board({ tiles: List(), objects: List() }),
  deck: new Deck({ availableCards: List(), discardedCards: List() })
})

export class Game extends game implements IGame {
  public readonly id: string
  public readonly started: boolean
  public readonly players: Map<string, Player>
  public readonly board: Board
  public readonly deck: Deck

  constructor(config: IGame) {
    super(config)
  }

  public start() {
    return this.set("started", true)
  }

  public player(id: string) {
    return this.players.get(id)
  }

  public addPlayer(player: Player) {
    return this.set("players", this.players.set(player.id, player))
  }

  public updatePlayer(player: Player) {
    return this.setIn(["players", player.id], player)
  }
}
