import { List } from "immutable"
import { Db, ObjectID } from "mongodb"
import joinGame from "../../../common/src/joinGame"
import startGame from "../../../common/src/startGame"
import { Game } from "../../../common/src/state/game"
import { deserializeCard } from "../../../common/src/state/serialization/card"
import submitCards from "../../../common/src/submitCards"
import buildGameFromPacks from "../db/buildGameFromPacks"
import findCharacter from "../db/findCharacter"
import loadGameState from "../db/loadGameState"
import saveGameState from "../db/saveGameState"
import { PackDoc } from "../db/types"

export default class GameManager {
  public readonly db: Db
  private readonly games: { [code: string]: Game }

  constructor(db: Db) {
    this.db = db
    this.games = {}
  }

  public async fetchPacks() {
    const packs = await this.db
      .collection<PackDoc>("packs")
      .find()
      .toArray()
    return packs.map(pack => ({ id: pack._id.toHexString(), name: pack.name }))
  }

  public async create(packIds: string[], boards: number) {
    const game = await buildGameFromPacks(
      packIds.map(ObjectID.createFromHexString),
      boards,
      this.db
    )

    return this.upsert(game)
  }

  public async get(code: string) {
    if (this.games[code]) {
      return this.games[code]
    } else if (code) {
      const game = await loadGameState(code, this.db)

      if (game) {
        this.games[code] = game
        return game
      }
    }
  }

  public async addPlayer(code: string) {
    const game = await this.get(code)

    if (game) {
      const result = joinGame(game, new ObjectID().toHexString())

      if (result) {
        await this.upsert(result.newState)
        return result.player
      }
    }
  }

  public async setCharacter(code: string, playerId: string, characterName: string) {
    const game = await this.get(code)

    if (game) {
      const character = await findCharacter(game, characterName, this.db)
      const player = game.player(playerId)

      if (character && player) {
        const newGame = game.updatePlayer(player.setCharacter(character))

        await this.upsert(newGame)
        return newGame
      }
    }
  }

  public async connectPlayer(code: string, playerId: string) {
    const game = await this.get(code)

    if (game) {
      const newPlayer = game.player(playerId).connect()
      const newGame = game.updatePlayer(newPlayer)

      await this.upsert(newGame)
      return newPlayer
    }
  }

  public async disconnectPlayer(code: string, playerId: string) {
    const game = await this.get(code)

    if (game) {
      const newPlayer = game.player(playerId).disconnect()
      const newGame = game.updatePlayer(newPlayer)

      await this.upsert(newGame)
      return newPlayer
    }
  }

  public async start(code: string) {
    const game = await this.get(code)

    if (game) {
      const newState = startGame(game)

      if (newState) {
        return this.upsert(newState)
      }
    }
  }

  public async submitCards(
    code: string,
    playerId: string,
    pickedCards: Array<{ configuredCard: any; index: number }>
  ) {
    const game = await this.get(code)

    if (game) {
      const result = submitCards(
        game,
        playerId,
        List(
          pickedCards.map(pickedCard => ({
            configuredCard: deserializeCard(pickedCard.configuredCard),
            index: pickedCard.index
          }))
        )
      )

      if (result) {
        this.upsert(result.game)
        return result
      }
    }
  }

  private async upsert(game: Game) {
    this.games[game.code] = game
    await saveGameState(game, this.db)

    return game
  }
}
