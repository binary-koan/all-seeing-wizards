import { GAME_CREATED, GameCreatedData } from "../../../common/src/messages/toClient"
import { REHOST_GAME, RehostGameData } from "../../../common/src/messages/toServer"
import { serializeGame } from "../../../common/src/state/serialization/game"
import { HostClient } from "../socket/clientTypes"
import createEventHandler, { withoutGameClient } from "../socket/createEventHandler"
import { emitToSocket, gameRoomId } from "../socket/emit"

const handleRehostGame = createEventHandler(
  REHOST_GAME,
  withoutGameClient(async (data: RehostGameData, { socket, manager }) => {
    const game = await manager.get(data.gameCode)

    socket.request.gameClient = new HostClient(game.code)
    socket.join(gameRoomId(socket.request.gameClient))

    emitToSocket<GameCreatedData>(socket, GAME_CREATED, { game: serializeGame(game) })
  })
)

export default handleRehostGame
