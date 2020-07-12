import { PACKS_FETCHED, PacksFetchedData } from "../../../common/src/messages/toClient"
import { FETCH_PACKS } from "../../../common/src/messages/toServer"
import createEventHandler, { withoutGameClient } from "../socket/createEventHandler"
import { emitToSocket } from "../socket/emit"

const handleFetchPacks = createEventHandler(
  FETCH_PACKS,
  withoutGameClient(async (_, { socket, manager }) => {
    emitToSocket<PacksFetchedData>(socket, PACKS_FETCHED, {
      packs: await manager.fetchPacks()
    })
  })
)

export default handleFetchPacks
