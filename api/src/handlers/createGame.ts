import { GAME_CREATED, GameCreatedData } from "../../../common/src/messages/toClient"
import { CREATE_GAME, CreateGameData } from "../../../common/src/messages/toServer"
import { serializeGame } from "../../../common/src/state/serialization/game"
import packDefinitions from "../../packs/dbValues"
import { HostClient } from "../socket/clientTypes"
import createEventHandler, { withoutGameClient } from "../socket/createEventHandler"
import { emitToSocket, gameRoomId } from "../socket/emit"

const handleCreateGame = createEventHandler(
  CREATE_GAME,
  withoutGameClient(async (data: CreateGameData, { socket, manager }) => {
    const game = await manager.create(
      data.packIds ||
        (
          await manager.db
            .collection("packs")
            .find<any>({ name: packDefinitions[0].name, version: packDefinitions[0].version })
            .toArray()
        ).map(doc => doc._id.toHexString()),
      data.boards
    )

    socket.request.gameClient = new HostClient(game.code)
    socket.join(gameRoomId(socket.request.gameClient))

    emitToSocket<GameCreatedData>(socket, GAME_CREATED, { game: serializeGame(game) })
  })
)

export default handleCreateGame
