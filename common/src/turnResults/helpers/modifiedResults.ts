import { List } from "immutable"
import { Player } from "../../state/player"
import { ActionResult } from "../resultTypes"

export default function modifiedResults(result: ActionResult, player: Player): List<ActionResult> {
  // TODO modifiers
  return List.of(result)
}
