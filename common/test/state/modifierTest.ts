import { Duration } from "../../src/state/duration"
import { Modifier, ModifierType } from "../../src/state/modifier"

function createTestModifier({
  type,
  duration
}: {
  type?: ModifierType
  duration?: Duration
} = {}) {
  return new Modifier({ type: type || "shield", duration: duration || new Duration("action", 1) })
}

describe("#advance", () => {
  it("changes the duration", () => {
    const modifier = createTestModifier({ duration: new Duration("action", 2) })

    expect(modifier.advance("action").duration).toEqual(new Duration("action", 1))
  })

  it("does nothing when given a different duration type", () => {
    const modifier = createTestModifier({ duration: new Duration("action", 1) })

    expect(modifier.advance("turn")).toEqual(modifier)
  })

  it("returns nothing when the modifier expires", () => {
    const modifier = createTestModifier({ duration: new Duration("action", 1) })

    expect(modifier.advance("action")).toBeUndefined()
  })
})
