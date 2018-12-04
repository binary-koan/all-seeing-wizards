import { Db, ObjectID } from "mongodb"
import joinGame, { JoinResult } from "../../../common/src/joinGame"
import startGame from "../../../common/src/startGame"
import { Game } from "../../../common/src/state/game"
import submitCards from "../../../common/src/submitCards"
import buildGameFromPacks from "../db/buildGameFromPacks"
import findAvailableCharacter from "../db/findAvailableCharacter"
import loadGameState from "../db/loadGameState"
import saveGameState from "../db/saveGameState"

export default class GameManager {
  public readonly db: Db
  private readonly games: { [code: string]: Game }

  constructor(db: Db) {
    this.db = db
    this.games = {}
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
      const character = await findAvailableCharacter(game, this.db)
      const result = joinGame(game, new ObjectID().toHexString(), character)

      if (result) {
        await this.upsert(result.newState)
        return result.player
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

  public async submitCards(code: string, playerId: string, indexes: number[]) {
    const game = await this.get(code)

    if (game) {
      const result = submitCards(game, playerId, indexes)

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
