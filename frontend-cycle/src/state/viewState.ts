import { Game } from "../../../common/src/state/game"

export default class ViewState {
  public game?: Game
  public playerId?: string
  public error?: { message: string; exception?: string }
  public connectedAs?: "player" | "host"
  public socketState: "connecting" | "connected" | "disconnected"

  public get player() {
    return this.game.player(this.playerId)
  }
}
