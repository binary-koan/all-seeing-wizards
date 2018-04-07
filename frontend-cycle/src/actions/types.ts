export type Action =
  | { type: "createGame" }
  | { type: "joinGame"; id: string }
  | { type: "unplaceCard"; index: number }

export function createGame(): Action {
  return { type: "createGame" }
}

export function joinGame(id: string): Action {
  return { type: "joinGame", id }
}

export function unplaceCard(index: number): Action {
  return { type: "unplaceCard", index }
}
