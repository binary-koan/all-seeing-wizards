import React from "react"
import { OVERRIDE_UNDERLAY } from "../../src/components/map/results/ResultViewProps"
import StretchedEffectImage from "../../src/components/map/results/StretchedEffectImage"
import TiledEffectImage from "../../src/components/map/results/TiledEffectImage"
import bindProps from "../../src/components/util/bindProps"
import { ViewConfig } from "../types"

const viewConfig: ViewConfig = {
  cards: {
    "Move 1": {
      image: require("./cards/forward-1.png").default,
      description: (
        <>
          Move forward <strong>1 space</strong>.
        </>
      )
    },

    "Move 2": {
      image: require("./cards/forward-2.png").default,
      description: (
        <>
          Move forward <strong>2 spaces</strong>.
        </>
      )
    },

    Turn: {
      image: require("./cards/turn-around-move.png").default,
      description: <>Turn on the spot without moving.</>
    },

    "Hellfire Breath": {
      image: require("./cards/hellfire-breath.png").default,
      description: (
        <>
          Deal <strong>2 damage</strong> to all players in a <strong>3x3 square</strong> in front of
          you.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: require("./effects/attack-fire.png").default,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: require("./effects/attack-fire.png").default,
            alpha: 1
          })
        }
      },
      preloadImages: [require("./effects/attack-fire.png").default]
    },

    "Chaos Storm": {
      image: require("./cards/chaos-storm.png").default,
      description: (
        <>
          Deal <strong>2 damage</strong> to all players in a <strong>5x5 square</strong> around you.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: require("./effects/attack-storm.png").default,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: require("./effects/attack-storm.png").default,
            alpha: 1
          })
        }
      },
      preloadImages: [require("./effects/attack-storm.png").default]
    },

    "Magical Dart": {
      image: require("./cards/magical-dart.png").default,
      description: (
        <>
          Deal <strong>1 damage</strong> to all players in a <strong>line</strong> directly in front
          of you.
        </>
      )
    },

    "Spartan Kick": {
      image: require("./cards/spartan-kick.png").default,
      description: (
        <>
          Deal <strong>3 damage</strong> to a player <strong>directly in front</strong> of you, and
          knock them back 2 spaces.
        </>
      )
    },

    "Homing Missile": {
      image: require("./cards/homing-missiles.png").default,
      description: (
        <>
          Deal <strong>1 damage</strong> to all players in a <strong>9x9 square</strong> around you.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-homing.png").default,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-homing.png").default,
            alpha: 1
          })
        }
      },
      preloadImages: [require("./effects/attack-homing.png").default]
    },

    "Freezing Touch": {
      image: require("./cards/freezing-touch.png").default,
      description: (
        <>
          <strong>Prevent</strong> a player <strong>directly in front</strong> of you from doing
          anything for 2 actions.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attemptPreventActions: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-freeze.png").default,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attemptPreventActions: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-freeze.png").default,
            alpha: 1
          })
        }
      },
      preloadImages: [require("./effects/attack-freeze.png").default]
    },

    "Yellow Snowballs": {
      image: require("./cards/yellow-snowballs.png").default,
      description: (
        <>
          <strong>Prevent</strong> all players in a <strong>5x5 square</strong> around you from
          doing anything for 2 actions.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attemptPreventActions: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-snowballs.png").default,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attemptPreventActions: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-snowballs.png").default,
            alpha: 1
          })
        }
      },
      preloadImages: [require("./effects/attack-snowballs.png").default]
    },

    "Force Lightning": {
      image: require("./cards/force-lightning.png").default,
      description: (
        <>
          Deal <strong>1 damage</strong> to all players in a <strong>line</strong> in front and
          behind you, and knock them back 1 space.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-lightning.png").default,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-lightning.png").default,
            alpha: 1
          })
        }
      },
      preloadImages: [require("./effects/attack-lightning.png").default]
    },

    "Spider Minions": {
      image: require("./cards/spider-minions.png").default,
      description: (
        <>
          Deal <strong>1 damage</strong> to all players in a <strong>line</strong> in the 4
          directions around you, and knock them back 1 space.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-spider.png").default,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: require("./effects/attack-spider.png").default,
            alpha: 1
          })
        }
      },
      preloadImages: [require("./effects/attack-spider.png").default]
    },

    "Piercing Scream": {
      image: require("./cards/piercing-scream.png").default,
      description: (
        <>
          Deal <strong>1 damage</strong> to all players in a <strong>3x3 square</strong> around you,
          and knock them back 2 spaces.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: require("./effects/attack-scream.png").default,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: require("./effects/attack-scream.png").default,
            alpha: 1
          })
        }
      },
      preloadImages: [require("./effects/attack-scream.png").default]
    },

    Earthquake: {
      image: require("./cards/earthquake.png").default,
      description: (
        <>
          Deal <strong>1 damage</strong> to all players.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: require("./effects/attack-earthquake.png").default,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: require("./effects/attack-earthquake.png").default,
            alpha: 1
          })
        }
      },
      preloadImages: [require("./effects/attack-earthquake.png").default]
    },

    "Magical Shield": {
      image: require("./cards/magical-shield.png").default,
      description: (
        <>
          <strong>Shield</strong> yourself from damage for <strong>this action</strong> only.
        </>
      )
    },

    Dimension: {
      image: require("./cards/dimension.png").default,
      description: (
        <>
          <strong>Shield</strong> yourself from damage for <strong>the rest of the turn</strong>.
        </>
      )
    },

    "Mirror Shield": {
      image: require("./cards/mirror-shield.png").default,
      description: (
        <>
          <strong>Reflect</strong> any damage you would normally take back at the attacker for{" "}
          <strong>this action</strong> only.
        </>
      )
    },

    "Parental Yell": {
      image: require("./cards/parental-yell.png").default,
      description: (
        <>
          <strong>Prevent</strong> all other players' cards from having any effect on{" "}
          <strong>this action</strong>.
        </>
      )
    },

    "Healing Drink": {
      image: require("./cards/healing-drink.png").default,
      description: (
        <>
          <strong>Heal 1 point</strong> of damage.
        </>
      )
    },

    "Healing Meal": {
      image: require("./cards/healing-meal.png").default,
      description: (
        <>
          <strong>Heal 2 points</strong> of damage.
        </>
      )
    },

    "Rage Potion": {
      image: require("./cards/rage-potion.png").default,
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
        north: require("./players/dark-lord-north.png").default,
        south: require("./players/dark-lord-south.png").default,
        east: require("./players/dark-lord-east.png").default,
        west: require("./players/dark-lord-west.png").default
      },
      heartImage: require("./players/dark-lord-heart.png").default
    },

    "Clever Cleric": {
      images: {
        north: require("./players/cleric-north.png").default,
        south: require("./players/cleric-south.png").default,
        east: require("./players/cleric-east.png").default,
        west: require("./players/cleric-west.png").default
      },
      heartImage: require("./players/cleric-heart.png").default
    },

    "Pure Paladin": {
      images: {
        north: require("./players/paladin-north.png").default,
        south: require("./players/paladin-south.png").default,
        east: require("./players/paladin-east.png").default,
        west: require("./players/paladin-west.png").default
      },
      heartImage: require("./players/paladin-heart.png").default
    },

    "Adaptable Alchemist": {
      images: {
        north: require("./players/alchemist-north.png").default,
        south: require("./players/alchemist-south.png").default,
        east: require("./players/alchemist-east.png").default,
        west: require("./players/alchemist-west.png").default
      },
      heartImage: require("./players/alchemist-heart.png").default
    },

    "Bold Battlemage": {
      images: {
        north: require("./players/battlemage-north.png").default,
        south: require("./players/battlemage-south.png").default,
        east: require("./players/battlemage-east.png").default,
        west: require("./players/battlemage-west.png").default
      },
      heartImage: require("./players/battlemage-heart.png").default
    },

    "Grumpy Gnome": {
      images: {
        north: require("./players/gnome-north.png").default,
        south: require("./players/gnome-south.png").default,
        east: require("./players/gnome-east.png").default,
        west: require("./players/gnome-west.png").default
      },
      heartImage: require("./players/gnome-heart.png").default
    },

    "Indignant Imp": {
      images: {
        north: require("./players/imp-north.png").default,
        south: require("./players/imp-south.png").default,
        east: require("./players/imp-east.png").default,
        west: require("./players/imp-west.png").default
      },
      heartImage: require("./players/imp-heart.png").default
    },

    "Thuggish Troll": {
      images: {
        north: require("./players/troll-north.png").default,
        south: require("./players/troll-south.png").default,
        east: require("./players/troll-east.png").default,
        west: require("./players/troll-west.png").default
      },
      heartImage: require("./players/troll-heart.png").default
    },

    "Warping Warlock": {
      images: {
        north: require("./players/warlock-north.png").default,
        south: require("./players/warlock-south.png").default,
        east: require("./players/warlock-east.png").default,
        west: require("./players/warlock-west.png").default
      },
      heartImage: require("./players/warlock-heart.png").default
    }
  }
}

export default viewConfig
