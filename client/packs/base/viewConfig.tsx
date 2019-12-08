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

    Turn: {
      image: require("./cards/turn-around-move.png"),
      description: <>Turn on the spot without moving.</>
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
      },
      preloadImages: [require("./effects/attack-fire.png")]
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
      },
      preloadImages: [require("./effects/attack-storm.png")]
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
      },
      preloadImages: [require("./effects/attack-homing.png")]
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
      },
      preloadImages: [require("./effects/attack-freeze.png")]
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
      },
      preloadImages: [require("./effects/attack-snowballs.png")]
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
      },
      preloadImages: [require("./effects/attack-lightning.png")]
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
      },
      preloadImages: [require("./effects/attack-spider.png")]
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
      },
      preloadImages: [require("./effects/attack-scream.png")]
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
      },
      preloadImages: [require("./effects/attack-earthquake.png")]
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
      heartImage: require("./players/dark-lord-heart.png")
    },

    "Clever Cleric": {
      images: {
        north: require("./players/cleric-north.png"),
        south: require("./players/cleric-south.png"),
        east: require("./players/cleric-east.png"),
        west: require("./players/cleric-west.png")
      },
      heartImage: require("./players/cleric-heart.png")
    },

    "Pure Paladin": {
      images: {
        north: require("./players/paladin-north.png"),
        south: require("./players/paladin-south.png"),
        east: require("./players/paladin-east.png"),
        west: require("./players/paladin-west.png")
      },
      heartImage: require("./players/paladin-heart.png")
    },

    "Adaptable Alchemist": {
      images: {
        north: require("./players/alchemist-north.png"),
        south: require("./players/alchemist-south.png"),
        east: require("./players/alchemist-east.png"),
        west: require("./players/alchemist-west.png")
      },
      heartImage: require("./players/alchemist-heart.png")
    },

    "Bold Battlemage": {
      images: {
        north: require("./players/battlemage-north.png"),
        south: require("./players/battlemage-south.png"),
        east: require("./players/battlemage-east.png"),
        west: require("./players/battlemage-west.png")
      },
      heartImage: require("./players/battlemage-heart.png")
    },

    "Grumpy Gnome": {
      images: {
        north: require("./players/gnome-north.png"),
        south: require("./players/gnome-south.png"),
        east: require("./players/gnome-east.png"),
        west: require("./players/gnome-west.png")
      },
      heartImage: require("./players/gnome-heart.png")
    },

    "Indignant Imp": {
      images: {
        north: require("./players/imp-north.png"),
        south: require("./players/imp-south.png"),
        east: require("./players/imp-east.png"),
        west: require("./players/imp-west.png")
      },
      heartImage: require("./players/imp-heart.png")
    },

    "Thuggish Troll": {
      images: {
        north: require("./players/troll-north.png"),
        south: require("./players/troll-south.png"),
        east: require("./players/troll-east.png"),
        west: require("./players/troll-west.png")
      },
      heartImage: require("./players/troll-heart.png")
    },

    "Warping Warlock": {
      images: {
        north: require("./players/warlock-north.png"),
        south: require("./players/warlock-south.png"),
        east: require("./players/warlock-east.png"),
        west: require("./players/warlock-west.png")
      },
      heartImage: require("./players/warlock-heart.png")
    }
  }
}

export default viewConfig
