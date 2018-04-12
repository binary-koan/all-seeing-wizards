import { Db, ObjectID } from "mongodb"
import { Game } from "../../../common/src/state/game"
import { Player } from "../../../common/src/state/player"
import { GameDiff, PlayerDiff } from "./types"

interface GameStateDiff {
  game?: GameDiff
  players?: PlayerDiff[]
}

export default async function saveGameState(game: Game, db: Db) {
  const updateResult = await updateGameState(game, db)

  await Promise.all(game.players.toArray().map(player => updatePlayer(player, db)))

  return updateResult.upsertedId._id
}

function updateGameState(game: Game, db: Db) {
  return db.collection("games").updateOne({ _id: game.id }, {
    started: game.started,
    playerIds: game.players.map(player => ObjectID.createFromHexString(player.id)),
    usedCardIds: game.deck.discardedCards.map(card => ObjectID.createFromHexString(card.id))
  } as GameStateDiff)
}

function updatePlayer(player: Player, db: Db) {
  return db.collection("players").updateOne({ _id: player.id }, {
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
