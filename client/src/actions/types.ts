import { List } from "immutable"
import { Game } from "../../../common/src/state/game"
import { ActionResult } from "../../../common/src/turnResults/resultTypes"

export interface FatalErrorAction {
  type: "fatalError"
  message: string
  exception?: string
}

export function fatalError(message: string, exception?: string): FatalErrorAction {
  return { type: "fatalError", message, exception }
}

export interface SocketConnectedAction {
  type: "socketConnected"
}

export function socketConnected(): SocketConnectedAction {
  return { type: "socketConnected" }
}

export interface SocketDisconnectedAction {
  type: "socketDisconnected"
}

export function socketDisconnected(): SocketDisconnectedAction {
  return { type: "socketDisconnected" }
}

export interface CreateGameAction {
  type: "createGame"
}

export function createGame(): CreateGameAction {
  return { type: "createGame" }
}

export interface GameCreatedAction {
  type: "gameCreated"
  game: Game
}

export function gameCreated(game: Game): GameCreatedAction {
  return { type: "gameCreated", game }
}

export interface RehostGameAction {
  type: "rehostGame"
  code: string
}

export function rehostGame(code: string): RehostGameAction {
  return { type: "rehostGame", code }
}

export interface JoinGameAction {
  type: "joinGame"
  code: string
}

export function joinGame(code: string): JoinGameAction {
  return { type: "joinGame", code }
}

export interface RejoinGameAction {
  type: "rejoinGame"
  code: string
  playerId: string
}

export function rejoinGame(code: string, playerId: string): RejoinGameAction {
  return { type: "rejoinGame", code, playerId }
}

export interface GameJoinedAction {
  type: "gameJoined"
  game: Game
  playerId: string
}

export function gameJoined(game: Game, playerId: string): GameJoinedAction {
  return { type: "gameJoined", game, playerId }
}

export interface GameUpdatedAction {
  type: "gameUpdated"
  game: Game
}

export function gameUpdated(game: Game): GameUpdatedAction {
  return { type: "gameUpdated", game }
}

export interface ActionsPerformedAction {
  type: "actionsPerformed"
  resultingGame: Game
  results: List<ActionResult>
}

export function actionsPerformed(
  resultingGame: Game,
  results: List<ActionResult>
): ActionsPerformedAction {
  return { type: "actionsPerformed", resultingGame, results }
}

export interface UnplaceCardAction {
  type: "unplaceCard"
  index: number
}

export function unplaceCard(index: number): UnplaceCardAction {
  return { type: "unplaceCard", index }
}

export interface PlayerConnectedAction {
  type: "playerConnected"
  playerId: string
}

export function playerConnected(playerId: string): PlayerConnectedAction {
  return { type: "playerConnected", playerId }
}

export interface PlayerDisconnectedAction {
  type: "playerDisconnected"
  playerId: string
}

export function playerDisconnected(playerId: string): PlayerDisconnectedAction {
  return { type: "playerDisconnected", playerId }
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
  | GameUpdatedAction
  | ActionsPerformedAction
  | PlayerConnectedAction
  | PlayerDisconnectedAction
