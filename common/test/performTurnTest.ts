import { List, Map, Range } from "immutable"
import performTurn from "../src/performTurn"
import {
  AttackEffect,
  CardEffect,
  HealEffect,
  KnockbackEffect,
  MovementEffect
} from "../src/state/cardEffect"
import { CardRange } from "../src/state/cardRange"
import { Player } from "../src/state/player"
import {
  createDirectionalPoint,
  createTestCards,
  createTestDuration,
  createTestGameState,
  createTestPlayer
} from "./state/support/testData"

function setPlayedCards(player: Player, effects: List<CardEffect>) {
  let hand = player.hand

  effects.forEach(
    effect => (hand = hand.addCard(createTestCards(1, { effects: List.of(effect) }).first()))
  )

  return player.updateHand(hand.pickCards(Range(0, effects.size).toList()))
}

describe("#performTurn", () => {
  it("works correctly when attacking a player who heals", () => {
    const caster = setPlayedCards(
      createTestPlayer({
        id: "caster",
        position: createDirectionalPoint({ x: 0, y: 0, facing: "east" })
      }),
      List.of({
        type: "attack",
        damage: 3,
        ranges: [
          {
            type: "area",
            size: 3,
            position: "around"
          } as CardRange
        ]
      } as AttackEffect)
    )
    const target = setPlayedCards(
      createTestPlayer({
        id: "target",
        position: createDirectionalPoint({ x: 1, y: 0 }),
        hp: 2
      }),
      List.of({
        type: "heal",
        amount: 2
      } as HealEffect)
    )

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(caster.id, caster).set(target.id, target)
    })

    const result = performTurn(game)

    expect(result.resultsPerAction.size).toBe(5)
    expect(
      result.resultsPerAction
        .first()
        .map(actionResult => actionResult.type)
        .toArray()
    ).toEqual(["heal", "attack", "takeDamage"])

    expect(result.game.player("target").hp).toEqual(2 + 2 - 3)
  })

  it("works correctly when actions are prevented on a player", () => {
    const preventer = setPlayedCards(
      createTestPlayer({
        id: "preventer",
        position: createDirectionalPoint({ x: 0, y: 0, facing: "east" })
      }),
      List.of({
        type: "preventActions",
        duration: createTestDuration({ type: "turn", length: 1 }),
        ranges: List.of({
          type: "area",
          size: 3,
          position: "around"
        } as CardRange)
      }) as List<CardEffect>
    )

    const preventee = setPlayedCards(
      createTestPlayer({
        id: "preventee",
        position: createDirectionalPoint({ x: 1, y: 0 }),
        hp: 2
      }),
      List.of(
        {
          type: "heal",
          amount: 2
        },
        {
          type: "increaseDamage",
          amount: 2,
          duration: createTestDuration()
        }
      ) as List<CardEffect>
    )

    const game = createTestGameState({
      players: (Map() as Map<string, Player>)
        .set(preventer.id, preventer)
        .set(preventee.id, preventee)
    })

    const result = performTurn(game)

    expect(
      result.resultsPerAction
        .flatten(1)
        .map(actionResult => actionResult.type)
        .toArray()
    ).toEqual(["attemptPreventActions", "preventActions"])

    expect(result.game.player("preventee").modifiers.size).toBe(0)
  })

  it("works correctly when a player moves into the attack path of another player", () => {
    const caster = setPlayedCards(
      createTestPlayer({
        id: "caster",
        position: createDirectionalPoint({ x: 0, y: 0, facing: "east" })
      }),
      List.of({
        type: "attack",
        damage: 3,
        ranges: [
          {
            type: "point",
            position: "inFront"
          } as CardRange
        ]
      } as AttackEffect)
    )
    const target = setPlayedCards(
      createTestPlayer({
        id: "target",
        position: createDirectionalPoint({ x: 1, y: 1, facing: "north" }),
        hp: 2
      }),
      List.of({
        type: "move",
        amount: 2,
        rotation: "none"
      } as MovementEffect)
    )

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(caster.id, caster).set(target.id, target)
    })

    const result = performTurn(game)

    expect(
      result.resultsPerAction
        .first()
        .map(actionResult => actionResult.type)
        .toArray()
    ).toEqual(["move", "attack", "takeDamage"])

    expect(result.game.player("target").hp).toEqual(0)
  })

  it("works correctly when knockback is blocked by player movement", () => {
    const caster = setPlayedCards(
      createTestPlayer({
        id: "caster",
        position: createDirectionalPoint({ x: 0, y: 0, facing: "east" })
      }),
      List.of({
        type: "knockback",
        amount: 1,
        ranges: [
          {
            type: "point",
            position: "inFront"
          }
        ]
      } as KnockbackEffect)
    )
    const target = setPlayedCards(
      createTestPlayer({
        id: "target",
        position: createDirectionalPoint({ x: 1, y: 1, facing: "north" }),
        hp: 2
      }),
      List.of({
        type: "move",
        amount: 2,
        rotation: "none"
      } as MovementEffect)
    )
    const mover = setPlayedCards(
      createTestPlayer({
        id: "mover",
        position: createDirectionalPoint({ x: 2, y: 1, facing: "north" }),
        hp: 2
      }),
      List.of({
        type: "move",
        amount: 2,
        rotation: "none"
      } as MovementEffect)
    )

    const game = createTestGameState({
      players: (Map() as Map<string, Player>)
        .set(caster.id, caster)
        .set(target.id, target)
        .set(mover.id, mover)
    })

    const result = performTurn(game)

    expect(
      result.resultsPerAction
        .first()
        .map(actionResult => actionResult.type)
        .toArray()
    ).toEqual(["move", "move"])

    expect(
      result.game
        .player("target")
        .position.equals(createDirectionalPoint({ x: 1, y: 0, facing: "north" }))
    ).toBeTruthy()
  })
})
