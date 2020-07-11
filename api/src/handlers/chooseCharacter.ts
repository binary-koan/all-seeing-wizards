import {
  GAME_UPDATED,
  GameUpdatedData,
  UNEXPECTED_ERROR,
  UnexpectedErrorData
} from "../../../common/src/messages/toClient"
import { CHOOSE_CHARACTER, ChooseCharacterData } from "../../../common/src/messages/toServer"
import { serializeGame } from "../../../common/src/state/serialization/game"
import { PlayerClient } from "../socket/clientTypes"
import createEventHandler, { withGameClient } from "../socket/createEventHandler"
import { emitToGame } from "../socket/emit"

const handleChooseCharacter = createEventHandler(
  CHOOSE_CHARACTER,
  withGameClient(async (data: ChooseCharacterData, { socket, manager, client }) => {
    if (!client.isPlayer) {
      return emitToGame<UnexpectedErrorData>(client, socket.server, UNEXPECTED_ERROR, {
        message: "Host cannot choose a character"
      })
    }

    const newGame = await manager.setCharacter(
      client.gameCode,
      (client as PlayerClient).playerId,
      data.name
    )

    const serializedNewState = serializeGame(newGame)

    emitToGame<GameUpdatedData>(socket.request.gameClient, socket.server, GAME_UPDATED, {
      game: serializedNewState
    })
  })
)

export default handleChooseCharacter
