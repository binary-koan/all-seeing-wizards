import { Duration } from "../../src/state/duration"
import { createTestModifier } from "./support/testData"

describe("#advance", () => {
  it("changes the duration", () => {
    const modifier = createTestModifier({ duration: new Duration("action", 2) })

    expect(modifier.advance("action").duration).toEqual(new Duration("action", 1))
  })

  it("does nothing when given a different duration type", () => {
    const modifier = createTestModifier({ duration: new Duration("action", 1) })

    expect(modifier.advance("turn")).toEqual(modifier)
  })
})
