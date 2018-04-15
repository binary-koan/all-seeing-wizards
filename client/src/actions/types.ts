import { Game } from "../../../common/src/state/game"

export interface FatalErrorAction {
  type: "fatalError"
  message: string
  exception?: string
}

export interface SocketConnectedAction {
  type: "socketConnected"
}

export interface SocketDisconnectedAction {
  type: "socketDisconnected"
}

export interface CreateGameAction {
  type: "createGame"
}

export interface GameCreatedAction {
  type: "gameCreated"
  game: Game
}

export interface RehostGameAction {
  type: "rehostGame"
  code: string
}

export interface JoinGameAction {
  type: "joinGame"
  code: string
}

export interface RejoinGameAction {
  type: "rejoinGame"
  code: string
  playerId: string
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
  | SocketConnectedAction
  | SocketDisconnectedAction
  | FatalErrorAction
  | CreateGameAction
  | RehostGameAction
  | JoinGameAction
  | RejoinGameAction
  | UnplaceCardAction
  | GameCreatedAction
  | GameJoinedAction

export function fatalError(message: string, exception?: string): FatalErrorAction {
  return { type: "fatalError", message, exception }
}

export function socketConnected(): SocketConnectedAction {
  return { type: "socketConnected" }
}

export function socketDisconnected(): SocketDisconnectedAction {
  return { type: "socketDisconnected" }
}

export function createGame(): CreateGameAction {
  return { type: "createGame" }
}

export function rehostGame(code: string): RehostGameAction {
  return { type: "rehostGame", code }
}

export function gameCreated(game: Game): GameCreatedAction {
  return { type: "gameCreated", game }
}

export function joinGame(code: string): JoinGameAction {
  return { type: "joinGame", code }
}

export function rejoinGame(code: string, playerId: string): RejoinGameAction {
  return { type: "rejoinGame", code, playerId }
}

export function gameJoined(game: Game, playerId: string): GameJoinedAction {
  return { type: "gameJoined", game, playerId }
}

export function unplaceCard(index: number): UnplaceCardAction {
  return { type: "unplaceCard", index }
}
