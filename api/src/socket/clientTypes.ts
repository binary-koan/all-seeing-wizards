export abstract class Client {
  public readonly gameId: string

  constructor(gameId: string) {
    this.gameId = gameId
  }

  abstract get isHost(): boolean
  abstract get isPlayer(): boolean
}

export class PlayerClient extends Client {
  public readonly playerId: string

  constructor(gameId: string, playerId: string) {
    super(gameId)
    this.playerId = playerId
  }

  get isHost() {
    return false
  }

  get isPlayer() {
    return true
  }
}

export class HostClient extends Client {
  get isHost() {
    return true
  }

  get isPlayer() {
    return false
  }
}
