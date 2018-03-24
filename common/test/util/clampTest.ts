import clamp from "../../src/util/clamp"

describe("#clamp", () => {
  it("doesn't touch a number between the bounds", () => {
    expect(clamp(3, 0, 5)).toBe(3)
  })

  it("clamps to the lower bound", () => {
    expect(clamp(-2, 0, 5)).toBe(0)
  })

  it("clamps to the upper bound", () => {
    expect(clamp(6, 0, 5)).toBe(5)
  })
})
