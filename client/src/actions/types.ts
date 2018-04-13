import { Game } from "../../../common/src/state/game"

export interface FatalErrorAction {
  type: "fatalError"
  message: string
  exception?: string
}

export interface CreateGameAction {
  type: "createGame"
}

export interface GameCreatedAction {
  type: "gameCreated"
  game: Game
}

export interface JoinGameAction {
  type: "joinGame"
  code: string
}

export interface GameJoinedAction {
  type: "gameJoined"
  game: Game
  playerId: string
}

export interface UnplaceCardAction {
  type: "unplaceCard"
  index: number
}

export type Action =
  | FatalErrorAction
  | CreateGameAction
  | JoinGameAction
  | UnplaceCardAction
  | GameCreatedAction
  | GameJoinedAction

export function fatalError(message: string, exception?: string): FatalErrorAction {
  return { type: "fatalError", message, exception }
}

export function createGame(): CreateGameAction {
  return { type: "createGame" }
}

export function gameCreated(game: Game): GameCreatedAction {
  return { type: "gameCreated", game }
}

export function joinGame(code: string): JoinGameAction {
  return { type: "joinGame", code }
}

export function gameJoined(game: Game, playerId: string): GameJoinedAction {
  return { type: "gameJoined", game, playerId }
}

export function unplaceCard(index: number): UnplaceCardAction {
  return { type: "unplaceCard", index }
}
