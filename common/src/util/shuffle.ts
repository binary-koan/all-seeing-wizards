import { List } from "immutable"

export default function shuffle<T>(items: List<T>): List<T> {
  // TODO is this enough of a shuffle?
  return items.sortBy(Math.random).toList()
}
