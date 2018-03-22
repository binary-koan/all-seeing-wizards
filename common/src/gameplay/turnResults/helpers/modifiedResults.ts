import { ActionResult } from "../resultTypes"
import { Player } from "../../state/player"

export default function modifiedResults(result: ActionResult, player: Player): ActionResult[] {
  //TODO modifiers
  return [result]
}
