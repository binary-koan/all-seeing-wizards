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

export const CHOOSE_CHARACTER = "chooseCharacter"

export interface ChooseCharacterData {
  name: string
}

export const REJOIN_GAME = "rejoinGame"

export interface RejoinGameData {
  gameCode: string
  playerId: string
}

export const START_GAME = "startGame"

export const SUBMIT_CARDS = "submitCards"

export interface SubmitCardsData {
  pickedCards: Array<{ configuredCard: any; index: number }>
}

export type ToServerSocketEvent =
  | { event: typeof CREATE_GAME; args: CreateGameData }
  | { event: typeof REHOST_GAME; args: RehostGameData }
  | { event: typeof JOIN_GAME; args: JoinGameData }
  | { event: typeof CHOOSE_CHARACTER; args: ChooseCharacterData }
  | { event: typeof REJOIN_GAME; args: RejoinGameData }
  | { event: typeof START_GAME }
  | { event: typeof SUBMIT_CARDS; args: SubmitCardsData }
