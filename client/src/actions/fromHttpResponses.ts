import { HTTPSource } from "@cycle/http"
import xs from "xstream"
import { deserializeGame } from "../../../common/src/state/serialization/game"
import { fatalError, gameCreated, gameJoined } from "./types"

export default function fromHttpResponses(source: HTTPSource) {
  const gameCreationResponse$ = source
    .select("createGame")
    .flatten()
    .map(response => {
      if (response.body.data && response.body.data.game) {
        const game = deserializeGame(response.body.data.game)
        return gameCreated(game)
      } else if (response.body.error) {
        return fatalError(response.body.error)
      }
    })

  const gameJoinResponse$ = source
    .select("joinGame")
    .flatten()
    .map(response => {
      if (response.body.data && response.body.data.game) {
        const game = deserializeGame(response.body.data.game)
        return gameJoined(game, response.body.data.playerId)
      } else if (response.body.error) {
        return fatalError(response.body.error)
      }
    })

  return xs.merge(gameCreationResponse$, gameJoinResponse$)
}
