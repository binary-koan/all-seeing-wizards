import { List } from "immutable"
import { Character } from "../../src/state/character"
import { DirectionalPoint } from "../../src/state/directionalPoint"
import { Hand } from "../../src/state/hand"
import { Modifier } from "../../src/state/modifier"
import { Player } from "../../src/state/player"

function createTestPlayer({
  id,
  character,
  hp,
  position,
  hand,
  connected,
  modifiers
}: {
  id?: string
  character?: Character
  hp?: number
  position?: DirectionalPoint
  hand?: Hand
  connected?: boolean
  modifiers?: List<Modifier>
} = {}) {
  return new Player({
    id: id || "",
    character: character || new Character({ name: "", type: "" }),
    hp: hp != null ? hp : 3,
    position: position || new DirectionalPoint({ x: 0, y: 0, facing: "north" }),
    hand: hand || Hand.empty(),
    connected: connected != null ? connected : true,
    modifiers: modifiers || List()
  })
}

describe("#knockedOut", () => {
  it("is true when the player's hp is zero", () => {
    const player = createTestPlayer({ hp: 0 })

    expect(player.knockedOut).toBeTruthy()
  })

  it("is false when the player's hp is above zero", () => {
    const player = createTestPlayer({ hp: 2 })

    expect(player.knockedOut).toBeFalsy()
  })
})
