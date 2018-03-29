import { Db, ObjectID } from "mongodb"
import { GameState } from "../../../common/src/state/gameState"
import { Player } from "../../../common/src/state/player"
import { GameDiff, PlayerDiff } from "./types"

interface GameStateDiff {
  game?: GameDiff
  players?: PlayerDiff[]
}

export default function saveGameState(gameState: GameState, db: Db) {
  const mutations = [
    updateGameState(gameState, db),
    ...gameState.players.toArray().map(player => updatePlayer(player, db))
  ]

  return Promise.all(mutations)
}

function updateGameState(gameState: GameState, db: Db) {
  return db.collection("games").updateOne({ id: gameState.id }, {
    playerIds: gameState.players.map(player => ObjectID.createFromHexString(player.id)),
    usedCardIds: gameState.deck.discardedCards.map(card => ObjectID.createFromHexString(card.id))
  } as GameStateDiff)
}

function updatePlayer(player: Player, db: Db) {
  return db.collection("players").updateOne({ id: player.id }, {
    hp: player.hp,
    position: player.position,
    hand: {
      cardIds: player.hand.cards.toArray().map(card => ObjectID.createFromHexString(card.id)),
      pickedIndexes: player.hand.pickedIndexes.toArray()
    },
    modifiers: player.modifiers.toArray().map(modifier => ({
      type: modifier.type,
      duration: { type: modifier.duration.type, length: modifier.duration.length }
    }))
  } as PlayerDiff)
}
