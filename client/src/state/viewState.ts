import { List } from "immutable"
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
}
