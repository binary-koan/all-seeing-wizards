import { List } from "immutable"
import { Action, rehostGame, rejoinGame } from "../actions/types"
import { matchGamePath, matchPlayerPath } from "../util/paths"

//TODO do this as part of initializing Host/Player components?
export default function initialActions(): Action[] {
  const playerPathMatch = matchPlayerPath(location.pathname)
  const hostPathMatch = matchGamePath(location.pathname)

  if (playerPathMatch) {
    return [rejoinGame(playerPathMatch[1], playerPathMatch[2])]
  } else if (hostPathMatch) {
    return [rehostGame(hostPathMatch[1])]
  } else {
    return []
  }
}
