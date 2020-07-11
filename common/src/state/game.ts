import { List, Map } from "immutable"
import { RecordFactory } from "../util/immutableExtras"
import { Board } from "./board"
import { Deck } from "./deck"
import { Player } from "./player"

export enum GameFeature {
  PickMoveDirection = "PICK_MOVE_DIRECTION",
}

interface IGame {
  id: string
  code: string
  started: boolean
  players: Map<string, Player>
  board: Board
  deck: Deck
  features: List<GameFeature>
}

const game = RecordFactory<IGame>({
  id: "",
  code: "",
  started: false,
  players: Map(),
  board: new Board({
    tiles: List(),
    objects: List(),
    zones: List(),
    startPositions: List(),
    hauntingZoneIndexes: List(),
    hauntedZoneIndexes: List(),
  }),
  deck: new Deck({ availableCards: List(), discardedCards: List() }),
  features: List(),
})

export class Game extends game implements IGame {
  public readonly id: string
  public readonly code: string
  public readonly started: boolean
  public readonly players: Map<string, Player>
  public readonly board: Board
  public readonly deck: Deck
  public readonly features: List<GameFeature>

  constructor(config: IGame) {
    super(config)
  }

  public hasFeature(feature: GameFeature) {
    return this.features.includes(feature)
  }

  public start() {
    return this.set("started", true)
  }

  public get activePlayers() {
    return this.players.filter((player) => player.character && !player.knockedOut)
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

  public updateBoard(board: Board) {
    return this.set("board", board)
  }

  public updateDeck(deck: Deck) {
    return this.set("deck", deck)
  }
}
