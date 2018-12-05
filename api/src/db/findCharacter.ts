import { Db, ObjectID } from "mongodb"
import { Character } from "../../../common/src/state/character"
import { Game } from "../../../common/src/state/game"
import { CharacterDoc, GameDoc } from "./types"

export default async function findCharacter(game: Game, characterName: string, db: Db) {
  const gameDoc = await db
    .collection("games")
    .findOne<GameDoc>({ _id: ObjectID.createFromHexString(game.id) })

  if (!gameDoc) return

  const doc = await db
    .collection("characters")
    .findOne<CharacterDoc>({ packId: { $in: gameDoc.packIds }, name: characterName })

  if (!doc) return

  if (game.players.some(player => player.character && player.character.type === doc.type)) return

  return new Character({ id: doc._id.toHexString(), name: doc.name, type: doc.type })
}
