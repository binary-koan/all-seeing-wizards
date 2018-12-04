import { List } from "immutable"
import { Game } from "../../../common/src/state/game"
import { ActionResult } from "../../../common/src/turnResults/resultTypes"
import { Card } from "../../../common/src/state/card"

export interface SetGameCodeAction {
  type: "setGameCode"
  code: string
}

export function setGameCode(code: string): SetGameCodeAction {
  return { type: "setGameCode", code }
}

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
  boards: number
}

export function createGame(boards: number): CreateGameAction {
  return { type: "createGame", boards }
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
}

export function joinGame(): JoinGameAction {
  return { type: "joinGame" }
}

export interface RejoinGameAction {
  type: "rejoinGame"
  code: string
  playerId: string
}

export function rejoinGame(code: string, playerId: string): RejoinGameAction {
  return { type: "rejoinGame", code, playerId }
}

export interface StartGameAction {
  type: "startGame"
}

export function startGame(): StartGameAction {
  return { type: "startGame" }
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

export interface TurnResultsReceivedAction {
  type: "turnResultsReceived"
}

export function turnResultsReceived(): TurnResultsReceivedAction {
  return { type: "turnResultsReceived" }
}

export interface ShowResultsAction {
  type: "showResults"
  results: List<ActionResult>
}

export function showResults(results: List<ActionResult>): ShowResultsAction {
  return { type: "showResults", results }
}

export interface ApplyResultsAction {
  type: "applyResults"
  results: List<ActionResult>
}

export function applyResults(results: List<ActionResult>): ApplyResultsAction {
  return { type: "applyResults", results }
}

export interface PrepareForNextResultsAction {
  type: "prepareForNextResults"
}

export function prepareForNextResults(): PrepareForNextResultsAction {
  return { type: "prepareForNextResults" }
}

export interface PlaceCardAction {
  type: "placeCard"
  index: number
}

export function placeCard(index: number): PlaceCardAction {
  return { type: "placeCard", index }
}

export interface UnplaceCardAction {
  type: "unplaceCard"
  index: number
}

export function unplaceCard(index: number): UnplaceCardAction {
  return { type: "unplaceCard", index }
}

export interface SubmitCardsAction {
  type: "submitCards"
}

export function submitCards(): SubmitCardsAction {
  return { type: "submitCards" }
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

export interface ShowCardDetailsAction {
  type: "showCardDetails"
  card: Card
}

export function showCardDetails(card?: Card): ShowCardDetailsAction {
  return { type: "showCardDetails", card }
}

export type Action =
  | SocketConnectedAction
  | SocketDisconnectedAction
  | FatalErrorAction
  | SetGameCodeAction
  | CreateGameAction
  | RehostGameAction
  | JoinGameAction
  | RejoinGameAction
  | StartGameAction
  | PlaceCardAction
  | UnplaceCardAction
  | SubmitCardsAction
  | GameCreatedAction
  | GameJoinedAction
  | GameUpdatedAction
  | TurnResultsReceivedAction
  | ShowResultsAction
  | ApplyResultsAction
  | PrepareForNextResultsAction
  | PlayerConnectedAction
  | PlayerDisconnectedAction
  | ShowCardDetailsAction
