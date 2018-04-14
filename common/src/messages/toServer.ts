export const CREATE_GAME = "createGame"

export interface CreateGameData {
  packIds: string[]
}

export const JOIN_GAME = "joinGame"

export interface JoinGameData {
  gameCode: string
}

export const START_GAME = "startGame"

export const SUBMIT_CARDS = "submitCards"

export interface SubmitCardsData {
  indexes: number[]
}
