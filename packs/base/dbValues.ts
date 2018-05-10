import { Duration } from "../../common/src/state/duration"
import { DbValues } from "../dbTypes"

const values: DbValues = {
  version: 2,
  name: "base",
  boards: [
    [
      [".", "b", ".", ".", "."],
      [".", "b", ".", "r", "."],
      [".", "b", ".", ".", "w"],
      [".", ".", ".", "w", "w"],
      [".", ".", "r", "w", "l"]
    ],
    [
      [".", ".", ".", ".", "."],
      [".", "l", "r", ".", "."],
      [".", "b", ".", ".", "."],
      [".", "b", "b", "b", "."],
      ["b", ".", ".", ".", "."]
    ],
    [
      [".", ".", "b", ".", "."],
      ["l", ".", "b", ".", "."],
      [".", ".", ".", "w", "w"],
      [".", ".", ".", ".", "."],
      [".", "b", "w", "b", "."]
    ],
    [
      ["b", ".", ".", "w", "w"],
      [".", "b", ".", ".", "w"],
      [".", ".", ".", ".", "r"],
      [".", ".", ".", ".", "."],
      [".", "r", ".", "l", "."]
    ]
  ],
  characters: [
    {
      name: "Wily Wind Worker",
      type: "windWorker"
    },
    {
      name: "Pure Paladin",
      type: "paladin"
    },
    {
      name: "Despicable Dark Lord",
      type: "darkLord"
    },
    {
      name: "Arcane Alchemist",
      type: "alchemist"
    },
    {
      name: "Midas Magician",
      type: "midas"
    }
  ],
  cards: [
    {
      name: "Move 1",
      count: 3,
      effects: [{ type: "move", amount: 1, rotation: "none" }]
    },
    {
      name: "Move 2",
      count: 7,
      effects: [{ type: "move", amount: 2, rotation: "none" }]
    },
    {
      name: "Turn Clockwise & Move",
      count: 7,
      effects: [{ type: "move", amount: 1, rotation: "clockwise" }]
    },
    {
      name: "Turn Anticlockwise & Move",
      count: 7,
      effects: [
        {
          type: "move",
          amount: 1,
          rotation: "anticlockwise"
        }
      ]
    },
    {
      name: "Turn Around & Move",
      count: 7,
      effects: [
        {
          type: "move",
          amount: 1,
          rotation: "reverse"
        }
      ]
    },
    {
      name: "Hellfire Breath of Chillies",
      count: 2,
      effects: [
        {
          type: "attack",
          ranges: [{ type: "area", size: 3, position: "inFront" }],
          damage: 2
        }
      ]
    },
    {
      name: "Chaos Storm of Endless Homework",
      count: 1,
      effects: [
        {
          type: "attack",
          ranges: [{ type: "area", size: 5, position: "around" }],
          damage: 2
        }
      ]
    },
    {
      name: "Magical Dart of Papercuts",
      count: 3,
      effects: [
        {
          type: "attack",
          ranges: [{ type: "line", rotation: "none" }],
          damage: 2
        }
      ]
    },
    {
      name: "Spartan Kick of Epic Abs",
      count: 2,
      effects: [
        {
          type: "attack",
          damage: 3,
          ranges: [{ type: "point", position: "inFront" }]
        },
        { type: "knockback", amount: 2, ranges: [{ type: "point", position: "inFront" }] }
      ]
    },
    {
      name: "Homing Missile of Bending the Rules",
      count: 2,
      effects: [
        {
          type: "attack",
          ranges: [{ type: "area", size: 9, position: "around" }],
          damage: 1
        }
      ]
    },
    {
      name: "Freezing Touch of Ice Cubes",
      count: 2,
      effects: [
        {
          type: "preventActions",
          ranges: [{ type: "point", position: "inFront" }],
          duration: new Duration("action", 2)
        }
      ]
    },
    {
      name: "Yellow Snowballs of Going Too Far",
      count: 1,
      effects: [
        {
          type: "preventActions",
          ranges: [{ type: "area", size: 5, position: "around" }],
          duration: new Duration("action", 2)
        }
      ]
    },
    {
      name: "Force Lightning of Evil Laughter",
      count: 2,
      effects: [
        {
          type: "attack",
          damage: 1,
          ranges: [{ type: "line", rotation: "none" }, { type: "line", rotation: "reverse" }]
        },
        {
          type: "knockback",
          amount: 1,
          ranges: [{ type: "line", rotation: "none" }, { type: "line", rotation: "reverse" }]
        }
      ]
    },
    {
      name: "Spider Minions of Terror",
      count: 1,
      effects: [
        {
          type: "attack",
          ranges: [
            { type: "line", rotation: "none" },
            { type: "line", rotation: "clockwise" },
            { type: "line", rotation: "reverse" },
            { type: "line", rotation: "anticlockwise" }
          ],
          damage: 1
        },
        {
          type: "knockback",
          ranges: [
            { type: "line", rotation: "none" },
            { type: "line", rotation: "clockwise" },
            { type: "line", rotation: "reverse" },
            { type: "line", rotation: "anticlockwise" }
          ],
          amount: 1
        }
      ]
    },
    {
      name: "Piercing Scream of Unfairness",
      count: 2,
      effects: [
        {
          type: "attack",
          damage: 1,
          ranges: [{ type: "area", size: 3, position: "around" }]
        },
        { type: "knockback", amount: 2, ranges: [{ type: "area", size: 3, position: "around" }] }
      ]
    },
    {
      name: "Earthquake of Table Flipping",
      count: 1,
      effects: [
        {
          type: "attack",
          ranges: [{ type: "wholeMap" }],
          damage: 1
        }
      ]
    },
    {
      name: "Magical Shield of Hiding",
      count: 2,
      effects: [
        {
          type: "shield",
          duration: new Duration("action", 1)
        }
      ]
    },
    {
      name: "Dimension of Ultimate Time Out",
      count: 1,
      effects: [
        {
          type: "shield",
          duration: new Duration("turn", 1)
        }
      ]
    },
    {
      name: "Mirror Shield of Mutual Blackmail",
      count: 1,
      effects: [
        {
          type: "mirrorShield",
          duration: new Duration("action", 1)
        }
      ]
    },
    {
      name: "Decree of Total Grounding",
      count: 2,
      effects: [
        {
          type: "preventActions",
          ranges: [{ type: "wholeMap" }],
          duration: new Duration("action", 1)
        }
      ]
    },
    {
      name: "Healing Potion of Snacks",
      count: 3,
      effects: [
        {
          type: "heal",
          amount: 1
        }
      ]
    },
    {
      name: "Healing Potion of Lunch",
      count: 3,
      effects: [
        {
          type: "heal",
          amount: 2
        }
      ]
    },
    {
      name: "Rage Potion of Early Bedtime",
      count: 2,
      effects: [
        {
          type: "increaseDamage",
          amount: 1,
          duration: new Duration("action", 2)
        }
      ]
    }
  ]
}

export default values