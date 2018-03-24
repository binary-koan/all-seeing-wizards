import { Map } from "immutable"
import { createTestGameState, createTestPlayer } from "./support/testData"

describe("#player", () => {
  it("returns the player with the correct id", () => {
    const gameState = createTestGameState({
      players: Map({
        player1: createTestPlayer({ id: "player1" }),
        player2: createTestPlayer({ id: "player2" })
      })
    })

    expect(gameState.player("player2").id).toBe("player2")
  })

  it("returns nothing for an invalid id", () => {
    const gameState = createTestGameState({
      players: Map({
        player1: createTestPlayer({ id: "player1" }),
        player2: createTestPlayer({ id: "player2" })
      })
    })

    expect(gameState.player("player3")).toBeUndefined()
  })
})

describe("#updatePlayer", () => {
  it("updates the correct player", () => {
    const player = createTestPlayer({ id: "player1", hp: 5 })

    const gameState = createTestGameState({
      players: Map({
        player1: player,
        player2: createTestPlayer({ id: "player2", hp: 5 })
      })
    })

    const nextState = gameState.updatePlayer(player.updateHp(-2))

    expect(nextState.player("player1").hp).toBe(3)
    expect(nextState.player("player2").hp).toBe(5)
  })
})
