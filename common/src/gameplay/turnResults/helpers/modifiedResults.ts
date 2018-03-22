import { Player } from "../../state/player"
import { ActionResult } from "../resultTypes"

export default function modifiedResults(result: ActionResult, player: Player): ActionResult[] {
  // TODO modifiers
  return [result]
}
