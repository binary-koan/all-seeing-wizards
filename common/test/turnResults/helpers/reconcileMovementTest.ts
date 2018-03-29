import { List, Map } from "immutable"
import { Player } from "../../../src/state/player"
import { proposedMove, reconcileMovement } from "../../../src/turnResults/helpers/reconcileMovement"
import {
  createDirectionalPoint,
  createTestGameState,
  createTestPlayer
} from "../../state/support/testData"

describe("#reconcileMovement", () => {
  it("lets non-conflicting moves through", () => {
    const player1 = createTestPlayer({
      id: "player1",
      position: createDirectionalPoint({ x: 1, y: 1, facing: "north" })
    })

    const player2 = createTestPlayer({
      id: "player2",
      position: createDirectionalPoint({ x: 0, y: 0, facing: "east" })
    })

    const gameState = createTestGameState({
      players: (Map() as Map<string, Player>).set(player1.id, player1).set(player2.id, player2)
    })

    const proposedMoves = List.of(
      proposedMove(player1, List.of(createDirectionalPoint({ x: 1, y: 0, facing: "north" }))),
      proposedMove(
        player2,
        List.of(
          createDirectionalPoint({ x: 1, y: 0, facing: "east" }),
          createDirectionalPoint({ x: 2, y: 0, facing: "east" })
        )
      )
    )

    const results = reconcileMovement(proposedMoves, gameState)

    expect(results.size).toBe(2)
    expect(results.get(0)).toEqual({
      type: "move",
      player: player1,
      targetPosition: createDirectionalPoint({ x: 1, y: 0, facing: "north" })
    })
    expect(results.get(1)).toEqual({
      type: "move",
      player: player2,
      targetPosition: createDirectionalPoint({ x: 2, y: 0, facing: "east" })
    })
  })

  it("prevents walking through a stationary player", () => {
    const player1 = createTestPlayer({
      id: "player1",
      position: createDirectionalPoint({ x: 1, y: 0, facing: "north" })
    })

    const player2 = createTestPlayer({
      id: "player2",
      position: createDirectionalPoint({ x: 0, y: 0, facing: "east" })
    })

    const gameState = createTestGameState({
      players: (Map() as Map<string, Player>).set(player1.id, player1).set(player2.id, player2)
    })

    const proposedMoves = List.of(
      proposedMove(
        player2,
        List.of(
          createDirectionalPoint({ x: 1, y: 0, facing: "east" }),
          createDirectionalPoint({ x: 2, y: 0, facing: "east" })
        )
      )
    )

    const results = reconcileMovement(proposedMoves, gameState)

    expect(results.size).toBe(0)
  })

  it("prevents two players ending up on the same tile", () => {
    const player1 = createTestPlayer({
      id: "player1",
      position: createDirectionalPoint({ x: 2, y: 1, facing: "north" })
    })

    const player2 = createTestPlayer({
      id: "player2",
      position: createDirectionalPoint({ x: 0, y: 0, facing: "east" })
    })

    const gameState = createTestGameState({
      players: (Map() as Map<string, Player>).set(player1.id, player1).set(player2.id, player2)
    })

    const proposedMoves = List.of(
      proposedMove(player1, List.of(createDirectionalPoint({ x: 2, y: 0, facing: "north" }))),
      proposedMove(
        player2,
        List.of(
          createDirectionalPoint({ x: 1, y: 0, facing: "east" }),
          createDirectionalPoint({ x: 2, y: 0, facing: "east" })
        )
      )
    )

    const results = reconcileMovement(proposedMoves, gameState)

    expect(results.size).toBe(2)
    expect(results.get(0)).toEqual({
      type: "movePrevented",
      player: player1,
      attemptedPosition: createDirectionalPoint({ x: 2, y: 0, facing: "north" })
    })
    expect(results.get(1)).toEqual({
      type: "movePrevented",
      player: player2,
      attemptedPosition: createDirectionalPoint({ x: 2, y: 0, facing: "east" })
    })
  })
})
