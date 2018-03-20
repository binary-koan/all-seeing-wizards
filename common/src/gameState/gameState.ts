import { List, fromJS } from "immutable"
import { ImmutableGameObject } from "./base"
import { Board } from "./board"
import { Card } from "./card"
import { Player } from "./player"

export type ChangeStateOperation =
  | "playersChanged"
  | "playerConnectionStateChanged"
  | "playerHandChanged"
  | "cardDiscarded"

interface IGameState {
  version: number
  id: string
  players: List<Player>
  board: Board
  deck: Deck
  operationsSinceLastSave: List<ChangeStateOperation>
}

interface IDeck {
  availableCards: List<Card>
  discardedCards: List<Card>
}

export type GameState = ImmutableGameObject<IGameState>

export type Deck = ImmutableGameObject<IDeck>

export function buildGameState(state: IGameState) {
  return fromJS(state) as GameState
}

export function buildDeck(deck: IDeck) {
  return fromJS(deck) as Deck
}
