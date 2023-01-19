import { List, Map } from "immutable"
import { Player } from "../../src/state/player"
import { advanceHaunting, calculateHauntingResults } from "../../src/turnResults/haunting"
import { createTestBoard, createTestGameState, createTestPlayer } from "../state/support/testData"

describe("#calculateHauntingResults", () => {
  it("damages players in haunted zones", () => {
    const player = createTestPlayer()

    const board = createTestBoard()

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(player.id, player),
      board: board.setHauntedZones(List.of(board.zones.first()))
    })

    const results = calculateHauntingResults(game)

    expect(results.size).toBe(1)
    expect(results.get(0)).toEqual({
      type: "takeDamage",
      card: undefined,
      damage: 1,
      player
    })
  })
})

describe("#advanceHaunting", () => {
  it("haunts a zone with a knocked out player in it", () => {
    const knockedOut = createTestPlayer({ hp: 0 })

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(knockedOut.id, knockedOut)
    })

    const gameAfter = advanceHaunting(game)

    expect(gameAfter.board.hauntedZoneIndexes.size).toBe(0)
    expect(gameAfter.board.hauntingZoneIndexes.size).toBe(1)
  })

  it("changes haunting zones to haunted", () => {
    const knockedOut = createTestPlayer({ hp: 0 })

    const board = createTestBoard()

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(knockedOut.id, knockedOut),
      board: board.setHauntingZones(List.of(board.zones.first()))
    })

    const gameAfter = advanceHaunting(game)

    expect(gameAfter.board.hauntedZoneIndexes.size).toBe(1)
    expect(gameAfter.board.hauntingZoneIndexes.size).toBe(0)
  })

  it("finds haunting zones in an anticlockwise pattern", () => {
    const knockedOut1 = createTestPlayer({ id: "1", hp: 0 })
    const knockedOut2 = createTestPlayer({ id: "2", hp: 0 })
    const knockedOut3 = createTestPlayer({ id: "3", hp: 0 })

    const board = createTestBoard({ zones: 4 })

    const game = createTestGameState({
      players: (Map() as Map<string, Player>)
        .set(knockedOut1.id, knockedOut1)
        .set(knockedOut2.id, knockedOut2)
        .set(knockedOut3.id, knockedOut3),
      board
    })

    const gameAfter = advanceHaunting(game)

    expect(gameAfter.board.hauntedZoneIndexes.size).toBe(0)
    expect(gameAfter.board.hauntingZoneIndexes.toArray()).toEqual([0, 1, 3])
  })
})
