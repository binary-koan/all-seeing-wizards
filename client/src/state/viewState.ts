import { List } from "immutable"
import performTurn from "../../../common/src/performTurn"
import { Game } from "../../../common/src/state/game"
import { RecordFactory } from "../../../common/src/util/immutableExtras"

type Connection =
  | { type: "none" }
  | { type: "host" }
  | { type: "player"; id: string; placedCards: List<number> }

interface IViewState {
  game?: Game
  connectedAs: Connection
  error?: { message: string; exception?: string }
  socketState: "connecting" | "connected" | "disconnected"
}

const viewState = RecordFactory<IViewState>({
  game: undefined,
  connectedAs: { type: "none" },
  error: undefined,
  socketState: "connecting"
})

export default class ViewState extends viewState implements IViewState {
  public readonly game?: Game
  public readonly error?: { message: string; exception?: string }
  public readonly connectedAs: Connection
  public readonly socketState: "connecting" | "connected" | "disconnected"

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

  public get placedCardResults() {
    const placedCards = this.placedCards

    if (!placedCards) {
      return
    }

    const gameWithPlacedCards = this.game.updatePlayer(
      this.player.updateHand(this.player.hand.pickCards(this.placedCardIndexes))
    )

    return performTurn(gameWithPlacedCards)
  }
}
