import { createTestDuration } from "./support/testData"

describe("#shorten", () => {
  it("shortens by the expected amount", () => {
    const duration = createTestDuration({ type: "action", length: 3 })

    expect(duration.shorten("action", 2).length).toEqual(1)
  })

  it("does not modify a different duration type", () => {
    const duration = createTestDuration({ type: "action" })

    expect(duration.shorten("turn", 1)).toEqual(duration)
  })

  it("does not go below zero", () => {
    const duration = createTestDuration({ type: "action", length: 0 })

    expect(duration.shorten("action", 2).length).toEqual(0)
  })
})

describe("#expired", () => {
  it("is true when length is zero", () => {
    const duration = createTestDuration({ length: 0 })

    expect(duration.expired).toBeTruthy()
  })

  it("is false when length is nonzero", () => {
    const duration = createTestDuration({ length: 1 })

    expect(duration.expired).toBeFalsy()
  })
})
