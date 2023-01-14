import { List } from "immutable"
import { Character } from "../character"
import { DirectionalPoint } from "../directionalPoint"
import { Duration } from "../duration"
import { Hand } from "../hand"
import { Modifier } from "../modifier"
import { Player } from "../player"
import { deserializeCard } from "./card"

export function deserializePlayer(playerData: any) {
  return new Player({
    id: playerData.id,
    character: playerData.character && new Character(playerData.character),
    hp: playerData.hp,
    position: new DirectionalPoint(playerData.position),
    lastPosition: playerData.lastPosition && new DirectionalPoint(playerData.lastPosition),
    hand: new Hand({
      cards: List(playerData.hand.cards)
        .map(deserializeCard)
        .toList(),
      pickedCards: List(
        (playerData.hand.pickedCards as Array<{
          configuredCard: any
          index: number
        }>).map(pickedCard => ({
          configuredCard: deserializeCard(pickedCard.configuredCard),
          index: pickedCard.index
        }))
      ).toList()
    }),
    connected: playerData.connected,
    // TODO:
    abilityName: undefined,
    abilityModifier: undefined,
    modifiers: List(playerData.modifiers)
      .map((modifierData: any) => deserializeModifier(modifierData))
      .toList()
  })
}

function deserializeModifier(modifierData: any) {
  return new Modifier({
    type: modifierData.type,
    duration: new Duration(modifierData.duration.type, modifierData.duration.length)
  })
}
