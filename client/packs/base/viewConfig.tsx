import React from "react"
import { OVERRIDE_UNDERLAY } from "../../src/components/map/results/ResultViewProps"
import StretchedEffectImage from "../../src/components/map/results/StretchedEffectImage"
import TiledEffectImage from "../../src/components/map/results/TiledEffectImage"
import bindProps from "../../src/components/util/bindProps"
import { ViewConfig } from "../types"

const viewConfig: ViewConfig = {
  cards: {
    "Move 1": {
      image: require("./cards/forward-1.png"),
      description: (
        <>
          Move forward <strong>1 space</strong>.
        </>
      )
    },

    "Move 2": {
      image: require("./cards/forward-2.png"),
      description: (
        <>
          Move forward <strong>2 spaces</strong>.
        </>
      )
    },

    "Turn Clockwise & Move": {
      image: require("./cards/turn-right-move.png"),
      description: (
        <>
          Turn 90 degrees <strong>clockwise</strong>, then move <strong>1 space</strong>.
        </>
      )
    },

    "Turn Anticlockwise & Move": {
      image: require("./cards/turn-left-move.png"),
      description: (
        <>
          Turn 90 degrees <strong>anticlockwise</strong>, then move <strong>1 space</strong>.
        </>
      )
    },

    "Turn Around & Move": {
      image: require("./cards/turn-around-move.png"),
      description: (
        <>
          Turn <strong>180 degrees</strong>, then move <strong>1 space</strong>.
        </>
      )
    },

    "Hellfire Breath": {
      image: require("./cards/hellfire-breath.png"),
      description: (
        <>
          Deal <strong>2 damage</strong> to all players in a <strong>3x3 square</strong> in front of
          you.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: require("./effects/attack-fire.png"),
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: require("./effects/attack-fire.png"),
            alpha: 1
          })
        }
      }
    },

    "Chaos Storm": {
      image: require("./cards/chaos-storm.png"),
      description: (
        <>
          Deal <strong>2 damage</strong> to all players in a <strong>5x5 square</strong> around you.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: require("./effects/attack-storm.png"),
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: require("./effects/attack-storm.png"),
            alpha: 1
          })
        }
      }
    },

    "Magical Dart": {
      image: require("./cards/magical-dart.png"),
      description: (
        <>
          Deal <strong>1 damage</strong> to all players in a <strong>line</strong> directly in front
          of you.
        </>
      )
    },

    "Spartan Kick": {
      image: require("./cards/spartan-kick.png"),
      description: (
        <>
          Deal <strong>3 damage</strong> to a player <strong>directly in front</strong> of you, and
          knock them back 2 spaces.
        </>
      )
    },

    "Homing Missile": {
      image: require("./cards/homing-missiles.png"),
      description: (
        <>
          Deal <strong>1 damage</strong> to all players in a <strong>9x9 square</strong> around you.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-homing.png"),
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-homing.png"),
            alpha: 1
          })
        }
      }
    },

    "Freezing Touch": {
      image: require("./cards/freezing-touch.png"),
      description: (
        <>
          <strong>Prevent</strong> a player <strong>directly in front</strong> of you from doing
          anything for 2 actions.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attemptPreventActions: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-freeze.png"),
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attemptPreventActions: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-freeze.png"),
            alpha: 1
          })
        }
      }
    },

    "Yellow Snowballs": {
      image: require("./cards/yellow-snowballs.png"),
      description: (
        <>
          <strong>Prevent</strong> all players in a <strong>5x5 square</strong> around you from
          doing anything for 2 actions.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attemptPreventActions: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-snowballs.png"),
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attemptPreventActions: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-snowballs.png"),
            alpha: 1
          })
        }
      }
    },

    "Force Lightning": {
      image: require("./cards/force-lightning.png"),
      description: (
        <>
          Deal <strong>1 damage</strong> to all players in a <strong>line</strong> in front and
          behind you, and knock them back 1 space.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-lightning.png"),
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-lightning.png"),
            alpha: 1
          })
        }
      }
    },

    "Spider Minions": {
      image: require("./cards/spider-minions.png"),
      description: (
        <>
          Deal <strong>1 damage</strong> to all players in a <strong>line</strong> in the 4
          directions around you, and knock them back 1 space.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-spider.png"),
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-spider.png"),
            alpha: 1
          })
        }
      }
    },

    "Piercing Scream": {
      image: require("./cards/piercing-scream.png"),
      description: (
        <>
          Deal <strong>1 damage</strong> to all players in a <strong>3x3 square</strong> around you,
          and knock them back 2 spaces.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: require("./effects/attack-scream.png"),
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: require("./effects/attack-scream.png"),
            alpha: 1
          })
        }
      }
    },

    Earthquake: {
      image: require("./cards/earthquake.png"),
      description: (
        <>
          Deal <strong>1 damage</strong> to all players.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: require("./effects/attack-earthquake.png"),
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: require("./effects/attack-earthquake.png"),
            alpha: 1
          })
        }
      }
    },

    "Magical Shield": {
      image: require("./cards/magical-shield.png"),
      description: (
        <>
          <strong>Shield</strong> yourself from damage for <strong>this action</strong> only.
        </>
      )
    },

    Dimension: {
      image: require("./cards/dimension.png"),
      description: (
        <>
          <strong>Shield</strong> yourself from damage for <strong>the rest of the turn</strong>.
        </>
      )
    },

    "Mirror Shield": {
      image: require("./cards/mirror-shield.png"),
      description: (
        <>
          <strong>Reflect</strong> any damage you would normally take back at the attacker for{" "}
          <strong>this action</strong> only.
        </>
      )
    },

    "Parental Yell": {
      image: require("./cards/parental-yell.png"),
      description: (
        <>
          <strong>Prevent</strong> all other players' cards from having any effect on{" "}
          <strong>this action</strong>.
        </>
      )
    },

    "Healing Drink": {
      image: require("./cards/healing-drink.png"),
      description: (
        <>
          <strong>Heal 1 point</strong> of damage.
        </>
      )
    },

    "Healing Meal": {
      image: require("./cards/healing-meal.png"),
      description: (
        <>
          <strong>Heal 2 points</strong> of damage.
        </>
      )
    },

    "Rage Potion": {
      image: require("./cards/rage-potion.png"),
      description: (
        <>
          If your next action is an attack, <strong>increase its damage</strong> by{" "}
          <strong>1 point</strong>.
        </>
      )
    }
  },

  characters: {
    "Despicable Dark Lord": {
      images: {
        north: require("./players/dark-lord-north.png"),
        south: require("./players/dark-lord-south.png"),
        east: require("./players/dark-lord-east.png"),
        west: require("./players/dark-lord-west.png")
      },
      heartImage: require("./players/dark-lord-heart.png"),
      color: "#6A7787"
    },

    "Clever Cleric": {
      images: {
        north: require("./players/cleric-north.png"),
        south: require("./players/cleric-south.png"),
        east: require("./players/cleric-east.png"),
        west: require("./players/cleric-west.png")
      },
      heartImage: require("./players/cleric-heart.png"),
      color: "#F44236"
    },

    "Pure Paladin": {
      images: {
        north: require("./players/paladin-north.png"),
        south: require("./players/paladin-south.png"),
        east: require("./players/paladin-east.png"),
        west: require("./players/paladin-west.png")
      },
      heartImage: require("./players/paladin-heart.png"),
      color: "#EC9E42"
    },

    "Adaptable Alchemist": {
      images: {
        north: require("./players/alchemist-north.png"),
        south: require("./players/alchemist-south.png"),
        east: require("./players/alchemist-east.png"),
        west: require("./players/alchemist-west.png")
      },
      heartImage: require("./players/alchemist-heart.png"),
      color: "#677821"
    }
  }
}

export default viewConfig
