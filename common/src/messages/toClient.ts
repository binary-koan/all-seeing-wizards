export const GAME_CREATED = "gameCreated"

export interface GameCreatedData {
  game: any
}

export const GAME_JOINED = "gameJoined"

export interface GameJoinedData {
  game: any
  playerId: string
}

export const UNEXPECTED_ERROR = "unexpectedError"

export interface UnexpectedErrorData {
  message: string
  exception?: string
}

export const ACTIONS_PERFORMED = "actionsPerformed"

export interface ActionsPerformedData {
  game: any
  results: any[]
}

export const GAME_UPDATED = "gameUpdated"

export interface GameUpdatedData {
  game: any
}

export const PLAYER_CONNECTED = "playerConnected"

export interface PlayerConnectedData {
  playerId: string
}

export const PLAYER_DISCONNECTED = "playerDisconnected"

export interface PlayerDisconnectedData {
  playerId: string
}
