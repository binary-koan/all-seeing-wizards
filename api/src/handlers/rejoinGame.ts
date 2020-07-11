import {
  GAME_JOINED,
  GameJoinedData,
  PLAYER_CONNECTED,
  PlayerConnectedData
} from "../../../common/src/messages/toClient"
import { REJOIN_GAME, RejoinGameData } from "../../../common/src/messages/toServer"
import { serializeGame } from "../../../common/src/state/serialization/game"
import { PlayerClient } from "../socket/clientTypes"
import createEventHandler, { withoutGameClient } from "../socket/createEventHandler"
import { emitToGame, emitToSocket, gameRoomId } from "../socket/emit"

const handleRejoinGame = createEventHandler(
  REJOIN_GAME,
  withoutGameClient(async (data: RejoinGameData, { socket, manager }) => {
    const game = await manager.get(data.gameCode)
    const player = await manager.connectPlayer(data.gameCode, data.playerId)

    socket.request.gameClient = new PlayerClient(game.code, player.id)
    socket.join(gameRoomId(socket.request.gameClient))

    emitToSocket<GameJoinedData>(socket, GAME_JOINED, {
      game: serializeGame(await manager.get(game.code)),
      playerId: player.id
    })
    emitToGame<PlayerConnectedData>(socket.request.gameClient, socket.server, PLAYER_CONNECTED, {
      playerId: player.id
    })
  })
)

export default handleRejoinGame
