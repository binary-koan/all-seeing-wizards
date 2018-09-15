import { List } from "immutable"
import performTurn, { PerformTurnResults } from "../../../common/src/performTurn"
import { Game } from "../../../common/src/state/game"
import { ActionResult } from "../../../common/src/turnResults/resultTypes"
import { RecordFactory } from "../../../common/src/util/immutableExtras"

type Connection =
  | { type: "none" }
  | { type: "host" }
  | { type: "player"; id: string; placedCards: List<number> }

interface IViewState {
  game?: Game
  gameCode: string
  connectedAs: Connection
  error?: { message: string; exception?: string }
  socketState: "connecting" | "awaitingResponse" | "connected" | "disconnected"
  showingResults?: List<ActionResult>
}

const viewState = RecordFactory<IViewState>({
  game: undefined,
  gameCode: "",
  connectedAs: { type: "none" },
  error: undefined,
  socketState: "connecting",
  showingResults: undefined
})

export default class ViewState extends viewState implements IViewState {
  public readonly game?: Game
  public readonly gameCode: string
  public readonly error?: { message: string; exception?: string }
  public readonly connectedAs: Connection
  public readonly socketState: "connecting" | "awaitingResponse" | "connected" | "disconnected"
  public readonly showingResults?: List<ActionResult>

  constructor(config?: Partial<IViewState>) {
    super(config)
  }

  public get player() {
    return this.game && this.connectedAs.type === "player" && this.game.player(this.connectedAs.id)
  }

  public get placedCards() {
    if (this.placedCardIndexes) {
      return this.placedCardIndexes.map(index => this.player.hand.cards.get(index)).toList()
    }
  }

  public get placedCardIndexes() {
    if (this.player && this.player.hand.pickedCards.size > 0) {
      return this.player.hand.pickedIndexes
    } else if (this.connectedAs.type === "player") {
      return this.connectedAs.placedCards
    }
  }

  public get placedCardResults(): PerformTurnResults {
    const placedCards = this.placedCards

    // We don't want to show planned results when real ones are being displayed
    if (!placedCards || this.showingResults) {
      return { game: this.game, resultsPerAction: List() }
    }

    let gameWithPlacedCards = this.game.updatePlayer(
      this.player.updateHand(this.player.hand.pickCards(this.placedCardIndexes))
    )

    this.game.players
      .filterNot(player => player.id === this.player.id)
      .forEach(
        player =>
          (gameWithPlacedCards = gameWithPlacedCards.updatePlayer(
            player.updateHand(player.hand.removePickedCards())
          ))
      )

    return performTurn(gameWithPlacedCards)
  }
}
