import {
  GAME_UPDATED,
  GameUpdatedData,
  UNEXPECTED_ERROR,
  UnexpectedErrorData
} from "../../../common/src/messages/toClient"
import { START_GAME } from "../../../common/src/messages/toServer"
import { serializeGame } from "../../../common/src/state/serialization/game"
import createEventHandler, { withGameClient } from "../socket/createEventHandler"
import { emitToGame } from "../socket/emit"

const handleStartGame = createEventHandler(
  START_GAME,
  withGameClient(async (_, { client, socket, manager }) => {
    const newState = await manager.start(client.gameCode)

    if (newState) {
      emitToGame<GameUpdatedData>(client, socket.server, GAME_UPDATED, {
        game: serializeGame(newState)
      })
    } else {
      emitToGame<UnexpectedErrorData>(client, socket.server, UNEXPECTED_ERROR, {
        message: "Couldn't start game"
      })
    }
  })
)

export default handleStartGame
