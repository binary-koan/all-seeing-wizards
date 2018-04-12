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
  private readonly db: Db
  private readonly games: { [id: string]: Game }

  constructor(db: Db) {
    this.db = db
    this.games = {}
  }

  public async create(packIds: string[]) {
    const game = await buildGameFromPacks(packIds.map(ObjectID.createFromHexString), this.db)

    return this.upsert(game)
  }

  public async get(gameId: string) {
    if (this.games[gameId]) {
      return this.games[gameId]
    } else if (gameId) {
      const game = await loadGameState(ObjectID.createFromHexString(gameId), this.db)

      if (game) {
        this.games[gameId] = game
        return game
      }
    }
  }

  public async addPlayer(gameId: string) {
    const game = await this.get(gameId)

    if (game) {
      const character = await findAvailableCharacter(game, this.db)
      const result = joinGame(game, new ObjectID().toHexString(), character)

      if (result) {
        await this.upsert(result.newState)
        return result.player
      }
    }
  }

  public async start(gameId: string) {
    const game = await this.get(gameId)

    if (game) {
      const newState = startGame(game)

      if (newState) {
        return this.upsert(newState)
      }
    }
  }

  public async submitCards(gameId: string, playerId: string, indexes: number[]) {
    const game = await this.get(gameId)

    if (game) {
      const result = submitCards(game, playerId, indexes)

      if (result) {
        this.upsert(result.game)
        return result
      }
    }
  }

  private async upsert(game: Game) {
    this.games[game.id] = game
    await saveGameState(game, this.db)

    return game
  }
}
