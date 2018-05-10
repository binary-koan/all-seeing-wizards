import { List } from "immutable"
import { Character } from "../character"
import { DirectionalPoint } from "../directionalPoint"
import { Hand } from "../hand"
import { Modifier } from "../modifier"
import { Player } from "../player"
import { deserializeCard } from "./card"

export function deserializePlayer(playerData: any) {
  return new Player({
    id: playerData.id,
    character: new Character(playerData.character),
    hp: playerData.hp,
    position: new DirectionalPoint(playerData.position),
    lastPosition: playerData.lastPosition && new DirectionalPoint(playerData.lastPosition),
    hand: new Hand({
      cards: List(playerData.hand.cards)
        .map(deserializeCard)
        .toList(),
      pickedIndexes: List(playerData.hand.pickedIndexes as number[]).toList()
    }),
    connected: playerData.connected,
    modifiers: List(playerData.modifiers)
      .map((modifierData: any) => new Modifier(modifierData))
      .toList()
  })
}
