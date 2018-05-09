import { Db, ObjectID } from "mongodb"
import { Game } from "../../../common/src/state/game"
import { Player } from "../../../common/src/state/player"
import { GameDiff, PlayerDoc } from "./types"

export default async function saveGameState(game: Game, db: Db) {
  const updateResult = await updateGameState(game, db)

  await Promise.all(game.players.toArray().map(player => updatePlayer(player, db)))

  return (
    (updateResult.upsertedId && updateResult.upsertedId._id) ||
    ObjectID.createFromHexString(game.id)
  )
}

function updateGameState(game: Game, db: Db) {
  const diff: GameDiff = {
    started: game.started,
    playerIds: game.players.map(player => ObjectID.createFromHexString(player.id)).toArray(),
    usedCardIds: game.deck.discardedCards
      .map(card => ObjectID.createFromHexString(card.id))
      .toArray(),
    availableCardIds: game.deck.availableCards
      .map(card => ObjectID.createFromHexString(card.id))
      .toArray()
  }

  return db
    .collection("games")
    .updateOne({ _id: ObjectID.createFromHexString(game.id) }, { $set: diff })
}

function updatePlayer(player: Player, db: Db) {
  const doc: PlayerDoc = {
    characterId: ObjectID.createFromHexString(player.character.id),
    connected: player.connected,
    hp: player.hp,
    position: player.position,
    hand: {
      cardIds: player.hand.cards.map(card => ObjectID.createFromHexString(card.id)).toArray(),
      pickedIndexes: player.hand.pickedIndexes.toArray()
    },
    modifiers: player.modifiers
      .map(modifier => ({
        type: modifier.type,
        duration: { type: modifier.duration.type, length: modifier.duration.length }
      }))
      .toArray()
  }

  return db
    .collection("players")
    .updateOne({ _id: ObjectID.createFromHexString(player.id) }, doc, { upsert: true })
}
