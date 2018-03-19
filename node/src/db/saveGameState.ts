import { GameState, ChangeStateOperation } from "../../../common/src/game_state/types"
import { Db, ObjectID } from "mongodb"
import { GameDiff, PlayerDiff } from "./types"

interface GameStateDiff {
  game?: GameDiff
  players?: PlayerDiff[]
}

export default async function saveGameState(gameState: GameState, db: Db) {
  const diff = gameState.operationsSinceLastSave.reduce(
    (diff, operation) => addOperationDiff(diff, operation, gameState),
    {} as GameStateDiff
  )

  const mutations = [] as Promise<any>[]

  if (diff.game) {
    mutations.push(db.collection("games").updateOne({ id: gameState.id }, diff.game))
  }

  if (diff.players) {
    diff.players.forEach(player => {
      mutations.push(db.collection("players").updateOne({ id: gameState.id }, player))
    })
  }

  return await Promise.all(mutations)
}

function addOperationDiff(
  diff: GameStateDiff,
  operation: ChangeStateOperation,
  gameState: GameState
) {
  switch (operation) {
    case "playersChanged":
    case "cardDiscarded":
      if (!diff.game) {
        diff.game = {
          playerIds: gameState.players.map(player => ObjectID.createFromHexString(player.id)),
          usedCardIds: gameState.deck.discardedCards.map(card =>
            ObjectID.createFromHexString(card.id)
          )
        }
      }
      break

    case "playerConnectionStateChanged":
    case "playerHandChanged":
      if (!diff.players) {
        diff.players = gameState.players.map(player => ({
          hp: player.hp,
          position: player.position,
          hand: {
            cardIds: player.hand.cards.map(card => ObjectID.createFromHexString(card.id)),
            pickedIndexes: player.hand.pickedIndexes
          }
        }))
      }
      break
  }

  return diff
}
