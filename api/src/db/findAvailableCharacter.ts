import { Db, ObjectID } from "mongodb"
import { Character } from "../../../common/src/state/character"
import { Game } from "../../../common/src/state/game"
import { CharacterDoc, GameDoc } from "./types"

export default async function findAvailableCharacter(game: Game, db: Db) {
  const gameDoc = await db
    .collection("games")
    .findOne<GameDoc>({ _id: ObjectID.createFromHexString(game.id) })

  if (!gameDoc) {
    return
  }

  const characterDocs = await db
    .collection("characters")
    .find<CharacterDoc>({ packId: { $in: gameDoc.packIds } })
    .toArray()

  const existingCharacterTypes = game.players.map(player => player.character.type)

  const possibleCharacters = characterDocs.filter(
    character => !existingCharacterTypes.includes(character.type)
  )

  if (possibleCharacters.length > 0) {
    const doc = possibleCharacters[Math.round(Math.random() * possibleCharacters.length)]

    return new Character({ id: doc._id.toHexString(), name: doc.name, type: doc.type })
  }
}
