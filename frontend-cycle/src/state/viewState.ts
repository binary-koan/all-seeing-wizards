import { Game } from "../../../common/src/state/game"
import { RecordFactory } from "../../../common/src/util/immutableExtras"
import { List } from "immutable"

type Connection =
  | { type: "none" }
  | { type: "host" }
  | { type: "player"; id: string; placedCards: List<number> }

interface IViewState {
  game?: Game
  connectedAs: Connection
  error?: { message: string; exception?: string }
  socketState: "notConnected" | "connecting" | "connected" | "disconnected"
}

const viewState = RecordFactory<IViewState>({
  game: undefined,
  connectedAs: { type: "none" },
  error: undefined,
  socketState: "notConnected"
})

export default class ViewState extends viewState implements IViewState {
  public readonly game?: Game
  public readonly playerId?: string
  public readonly error?: { message: string; exception?: string }
  public readonly connectedAs: Connection
  public readonly socketState: "connecting" | "connected" | "disconnected"

  public get player() {
    return this.game.player(this.playerId)
  }
}
