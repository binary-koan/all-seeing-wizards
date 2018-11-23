import { List } from "immutable"
import { ActionResult } from "../../../common/src/turnResults/resultTypes"

export function priorityResults(results: List<ActionResult>) {
  return results
    .filter(
      result =>
        result.type === "attemptPreventActions" ||
        result.type === "grantMirrorShield" ||
        result.type === "grantShield" ||
        result.type === "heal" ||
        result.type === "increaseDamage" ||
        result.type === "preventActions"
    )
    .toList()
}

export function moveResults(results: List<ActionResult>) {
  return results
    .filter(result => result.type === "move" || result.type === "movePrevented")
    .toList()
}

export function attackResults(results: List<ActionResult>) {
  return results
    .filter(
      result =>
        result.type === "attack" || result.type === "takeDamage" || result.type === "knockback"
    )
    .toList()
}
