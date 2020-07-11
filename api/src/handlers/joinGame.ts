import {
  GAME_JOINED,
  GAME_UPDATED,
  GameJoinedData,
  GameUpdatedData
} from "../../../common/src/messages/toClient"
import { JOIN_GAME, JoinGameData } from "../../../common/src/messages/toServer"
import { serializeGame } from "../../../common/src/state/serialization/game"
import { PlayerClient } from "../socket/clientTypes"
import createEventHandler, { withoutGameClient } from "../socket/createEventHandler"
import { emitToGame, emitToSocket, gameRoomId } from "../socket/emit"

const handleJoinGame = createEventHandler(
  JOIN_GAME,
  withoutGameClient(async (data: JoinGameData, { socket, manager }) => {
    const game = await manager.get(data.gameCode)
    const player = await manager.addPlayer(data.gameCode)

    socket.request.gameClient = new PlayerClient(game.code, player.id)
    socket.join(gameRoomId(socket.request.gameClient))

    const serializedNewState = serializeGame(await manager.get(game.code))

    emitToSocket<GameJoinedData>(socket, GAME_JOINED, {
      game: serializedNewState,
      playerId: player.id
    })
    emitToGame<GameUpdatedData>(socket.request.gameClient, socket.server, GAME_UPDATED, {
      game: serializedNewState
    })
  })
)

export default handleJoinGame
