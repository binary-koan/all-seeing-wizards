import { List } from "immutable"
import { Card } from "../../../common/src/state/card"
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

export interface FetchPacksAction {
  type: "fetchPacks"
}

export function fetchPacks(): FetchPacksAction {
  return { type: "fetchPacks" }
}

export interface PacksFetchedAction {
  type: "packsFetched"
  packs: List<{ id: string; name: string }>
}

export function packsFetched(packs: List<{ id: string; name: string }>): PacksFetchedAction {
  return { type: "packsFetched", packs }
}

export interface CreateGameAction {
  type: "createGame"
  boards: number
  packIds: List<string>
}

export function createGame(boards: number, packIds: List<string>): CreateGameAction {
  return { type: "createGame", boards, packIds }
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
  gameCode: string
}

export function joinGame(gameCode: string): JoinGameAction {
  return { type: "joinGame", gameCode }
}

export interface ChooseCharacterAction {
  type: "chooseCharacter"
  name: string
}

export function chooseCharacter(name: string): ChooseCharacterAction {
  return { type: "chooseCharacter", name }
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

export interface EndGameAction {
  type: "endGame"
}

export function endGame(): EndGameAction {
  return { type: "endGame" }
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

export interface ShowCountdownAction {
  type: "showCountdown"
  number: number
}

export function showCountdown(number: number): ShowCountdownAction {
  return { type: "showCountdown", number }
}

export interface ShowResultsAction {
  type: "showResults"
  results?: List<ActionResult>
  actionIndex?: number
}

export function showResults(results: List<ActionResult>, actionIndex?: number): ShowResultsAction {
  return { type: "showResults", results, actionIndex }
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
  actionIndex: number
}

export function prepareForNextResults(actionIndex: number): PrepareForNextResultsAction {
  return { type: "prepareForNextResults", actionIndex }
}

export interface PlaceCardAction {
  type: "placeCard"
  card: Card
  index: number
}

export function placeCard(card: Card, index: number): PlaceCardAction {
  return { type: "placeCard", card, index }
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
  | FetchPacksAction
  | PacksFetchedAction
  | CreateGameAction
  | RehostGameAction
  | JoinGameAction
  | ChooseCharacterAction
  | RejoinGameAction
  | StartGameAction
  | EndGameAction
  | PlaceCardAction
  | UnplaceCardAction
  | SubmitCardsAction
  | GameCreatedAction
  | GameJoinedAction
  | GameUpdatedAction
  | TurnResultsReceivedAction
  | ShowCountdownAction
  | ShowResultsAction
  | ApplyResultsAction
  | PrepareForNextResultsAction
  | PlayerConnectedAction
  | PlayerDisconnectedAction
  | ShowCardDetailsAction
