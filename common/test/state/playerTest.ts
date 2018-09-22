import { List } from "immutable"
import { MAX_PLAYER_HP } from "../../src/state/player"
import {
  createDirectionalPoint,
  createTestDuration,
  createTestModifier,
  createTestPlayer
} from "./support/testData"

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

describe("#updateHp", () => {
  it("updates the player's hp", () => {
    const player = createTestPlayer({ hp: 3 })

    expect(player.updateHp(1).hp).toBe(4)
  })

  it("prevents hp going lower than zero", () => {
    const player = createTestPlayer({ hp: 3 })

    expect(player.updateHp(-4).hp).toBe(0)
  })

  it("prevents hp going higher than the max hp", () => {
    const player = createTestPlayer({ hp: MAX_PLAYER_HP - 2 })

    expect(player.updateHp(4).hp).toBe(MAX_PLAYER_HP)
  })
})

describe("#updatePosition", () => {
  it("updates the player's position", () => {
    const player = createTestPlayer({ position: createDirectionalPoint({ x: 1, y: 2 }) })
    const newPosition = createDirectionalPoint({ x: 2, y: 3 })

    expect(player.updatePosition(newPosition).position).toBe(newPosition)
  })
})

describe("#addModifier", () => {
  it("adds a modifier to the player", () => {
    const player = createTestPlayer()
    const modifier = createTestModifier({
      type: { name: "mirrorShield" },
      duration: createTestDuration()
    })

    expect(player.addModifier(modifier).modifiers).toEqual(List.of(modifier))
  })
})

describe("#advanceModifiers", () => {
  it("advances modifiers with the correct type", () => {
    const turnModifier = createTestModifier({
      type: { name: "mirrorShield" },
      duration: createTestDuration({ type: "turn", length: 2 })
    })
    const actionModifier = createTestModifier({
      type: { name: "mirrorShield" },
      duration: createTestDuration({ type: "action", length: 2 })
    })

    const player = createTestPlayer({ modifiers: List.of(turnModifier, actionModifier) })

    const afterAdvancingAction = player.advanceModifiers("action")

    expect(afterAdvancingAction.modifiers).toEqual(
      List.of(turnModifier, actionModifier.advance("action"))
    )

    const afterAdvancingTurn = player.advanceModifiers("turn")

    expect(afterAdvancingTurn.modifiers).toEqual(
      List.of(turnModifier.advance("turn"), actionModifier)
    )
  })

  it("removes expired modifiers", () => {
    const actionModifier = createTestModifier({
      type: { name: "mirrorShield" },
      duration: createTestDuration({ type: "action", length: 1 })
    })

    const player = createTestPlayer({ modifiers: List.of(actionModifier) })

    const afterAdvancingAction = player.advanceModifiers("action")

    expect(afterAdvancingAction.modifiers.size).toBe(0)
  })
})
