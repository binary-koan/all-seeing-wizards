export const CREATE_GAME = "createGame"

export interface CreateGameData {
  packIds: string[]
  boards: number
}

export const REHOST_GAME = "rehostGame"

export interface RehostGameData {
  gameCode: string
}

export const JOIN_GAME = "joinGame"

export interface JoinGameData {
  gameCode: string
}

export const REJOIN_GAME = "rejoinGame"

export interface RejoinGameData {
  gameCode: string
  playerId: string
}

export const START_GAME = "startGame"

export const SUBMIT_CARDS = "submitCards"

export interface SubmitCardsData {
  indexes: number[]
}
