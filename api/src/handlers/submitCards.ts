import {
  ACTIONS_PERFORMED,
  ActionsPerformedData,
  GAME_UPDATED,
  GameUpdatedData,
  UNEXPECTED_ERROR,
  UnexpectedErrorData
} from "../../../common/src/messages/toClient"
import { SUBMIT_CARDS, SubmitCardsData } from "../../../common/src/messages/toServer"
import { serializeGame } from "../../../common/src/state/serialization/game"
import { serializeResults } from "../../../common/src/state/serialization/results"
import { PlayerClient } from "../socket/clientTypes"
import createEventHandler, { withGameClient } from "../socket/createEventHandler"
import { emitToGame } from "../socket/emit"

const handleSubmitCards = createEventHandler(
  SUBMIT_CARDS,
  withGameClient(async (data: SubmitCardsData, { socket, manager, client }) => {
    if (!client.isPlayer) {
      return emitToGame<UnexpectedErrorData>(client, socket.server, UNEXPECTED_ERROR, {
        message: "Host cannot submit cards"
      })
    }

    const result = await manager.submitCards(
      client.gameCode,
      (client as PlayerClient).playerId,
      data.pickedCards
    )

    if (result.game) {
      if (result.resultsPerAction) {
        emitToGame<ActionsPerformedData>(client, socket.server, ACTIONS_PERFORMED, {
          game: serializeGame(result.game),
          results: result.resultsPerAction.map(serializeResults).toArray()
        })
      } else {
        emitToGame<GameUpdatedData>(client, socket.server, GAME_UPDATED, {
          game: serializeGame(result.game)
        })
      }
    } else {
      emitToGame<UnexpectedErrorData>(client, socket.server, UNEXPECTED_ERROR, {
        message: "Couldn't submit cards"
      })
    }
  })
)

export default handleSubmitCards
