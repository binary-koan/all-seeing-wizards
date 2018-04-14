export abstract class Client {
  public readonly gameCode: string

  constructor(gameCode: string) {
    this.gameCode = gameCode
  }

  abstract get isHost(): boolean
  abstract get isPlayer(): boolean
}

export class PlayerClient extends Client {
  public readonly playerId: string

  constructor(gameCode: string, playerId: string) {
    super(gameCode)
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
