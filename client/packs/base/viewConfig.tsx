import React from "react"
import { OVERRIDE_UNDERLAY } from "../../src/components/map/results/ResultViewProps"
import StretchedEffectImage from "../../src/components/map/results/StretchedEffectImage"
import TiledEffectImage from "../../src/components/map/results/TiledEffectImage"
import bindProps from "../../src/components/util/bindProps"
import { ViewConfig } from "../types"

import chaosStorm from "./cards/chaos-storm.png"
import dimension from "./cards/dimension.png"
import earthquake from "./cards/earthquake.png"
import forceLightning from "./cards/force-lightning.png"
import forward_1 from "./cards/forward-1.png"
import forward_2 from "./cards/forward-2.png"
import freezingTouch from "./cards/freezing-touch.png"
import healingDrink from "./cards/healing-drink.png"
import healingMeal from "./cards/healing-meal.png"
import hellfireBreath from "./cards/hellfire-breath.png"
import homingMissiles from "./cards/homing-missiles.png"
import magicalDart from "./cards/magical-dart.png"
import magicalShield from "./cards/magical-shield.png"
import mirrorShield from "./cards/mirror-shield.png"
import parentalYell from "./cards/parental-yell.png"
import piercingScream from "./cards/piercing-scream.png"
import ragePotion from "./cards/rage-potion.png"
import spartanKick from "./cards/spartan-kick.png"
import spiderMinions from "./cards/spider-minions.png"
import turnAroundMove from "./cards/turn-around-move.png"
import yellowSnowballs from "./cards/yellow-snowballs.png"
import attackEarthquake from "./effects/attack-earthquake.png"
import attackFire from "./effects/attack-fire.png"
import attackFreeze from "./effects/attack-freeze.png"
import attackHoming from "./effects/attack-homing.png"
import attackLightning from "./effects/attack-lightning.png"
import attackScream from "./effects/attack-scream.png"
import attackSnowballs from "./effects/attack-snowballs.png"
import attackSpider from "./effects/attack-spider.png"
import attackStorm from "./effects/attack-storm.png"
import alchemistEast from "./players/alchemist-east.png"
import alchemistHeart from "./players/alchemist-heart.png"
import alchemistNorth from "./players/alchemist-north.png"
import alchemistSouth from "./players/alchemist-south.png"
import alchemistWest from "./players/alchemist-west.png"
import battlemageEast from "./players/battlemage-east.png"
import battlemageHeart from "./players/battlemage-heart.png"
import battlemageNorth from "./players/battlemage-north.png"
import battlemageSouth from "./players/battlemage-south.png"
import battlemageWest from "./players/battlemage-west.png"
import clericEast from "./players/cleric-east.png"
import clericHeart from "./players/cleric-heart.png"
import clericNorth from "./players/cleric-north.png"
import clericSouth from "./players/cleric-south.png"
import clericWest from "./players/cleric-west.png"
import darkLordEast from "./players/dark-lord-east.png"
import darkLordHeart from "./players/dark-lord-heart.png"
import darkLordNorth from "./players/dark-lord-north.png"
import darkLordSouth from "./players/dark-lord-south.png"
import darkLordWest from "./players/dark-lord-west.png"
import gnomeEast from "./players/gnome-east.png"
import gnomeHeart from "./players/gnome-heart.png"
import gnomeNorth from "./players/gnome-north.png"
import gnomeSouth from "./players/gnome-south.png"
import gnomeWest from "./players/gnome-west.png"
import impEast from "./players/imp-east.png"
import impHeart from "./players/imp-heart.png"
import impNorth from "./players/imp-north.png"
import impSouth from "./players/imp-south.png"
import impWest from "./players/imp-west.png"
import paladinEast from "./players/paladin-east.png"
import paladinHeart from "./players/paladin-heart.png"
import paladinNorth from "./players/paladin-north.png"
import paladinSouth from "./players/paladin-south.png"
import paladinWest from "./players/paladin-west.png"
import trollEast from "./players/troll-east.png"
import trollHeart from "./players/troll-heart.png"
import trollNorth from "./players/troll-north.png"
import trollSouth from "./players/troll-south.png"
import trollWest from "./players/troll-west.png"
import warlockEast from "./players/warlock-east.png"
import warlockHeart from "./players/warlock-heart.png"
import warlockNorth from "./players/warlock-north.png"
import warlockSouth from "./players/warlock-south.png"
import warlockWest from "./players/warlock-west.png"

// TODO: This definitely shouldn't use the readable names of the cards - it's way too sensitive to changes in dbValues.ts
// Should be refactored to all be on the server or to use some shared IDs
const viewConfig: ViewConfig = {
  cards: {
    "Move 1": {
      image: forward_1,
      description: (
        <>
          Move forward <strong>1 space</strong>.
        </>
      )
    },

    "Move 2": {
      image: forward_2,
      description: (
        <>
          Move forward <strong>2 spaces</strong>.
        </>
      )
    },

    Turn: {
      image: turnAroundMove,
      description: <>Turn on the spot without moving.</>
    },

    "Hellfire Breath": {
      image: hellfireBreath,
      description: (
        <>
          Deal <strong>2 damage</strong> to all players in a <strong>3x3 square</strong> in front of
          you.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: attackFire,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: attackFire,
            alpha: 1
          })
        }
      },
      preloadImages: [attackFire]
    },

    "Chaos Storm": {
      image: chaosStorm,
      description: (
        <>
          Deal <strong>2 damage</strong> to all players in a <strong>5x5 square</strong> around you.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: attackStorm,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: attackStorm,
            alpha: 1
          })
        }
      },
      preloadImages: [attackStorm]
    },

    "Magical Dart": {
      image: magicalDart,
      description: (
        <>
          Deal <strong>1 damage</strong> to all players in a <strong>line</strong> directly in front
          of you.
        </>
      )
    },

    "Spartan Kick": {
      image: spartanKick,
      description: (
        <>
          Deal <strong>3 damage</strong> to a player <strong>directly in front</strong> of you, and
          knock them back 2 spaces.
        </>
      )
    },

    "Homing Missile": {
      image: homingMissiles,
      description: (
        <>
          Deal <strong>1 damage</strong> to all players in a <strong>9x9 square</strong> around you.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: attackHoming,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: attackHoming,
            alpha: 1
          })
        }
      },
      preloadImages: [attackHoming]
    },

    "Freezing Touch": {
      image: freezingTouch,
      description: (
        <>
          <strong>Prevent</strong> a player <strong>directly in front</strong> of you from doing
          anything for 2 actions.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attemptPreventActions: bindProps(TiledEffectImage, {
            imagePath: attackFreeze,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attemptPreventActions: bindProps(TiledEffectImage, {
            imagePath: attackFreeze,
            alpha: 1
          })
        }
      },
      preloadImages: [attackFreeze]
    },

    "Yellow Snowballs": {
      image: yellowSnowballs,
      description: (
        <>
          <strong>Prevent</strong> all players in a <strong>5x5 square</strong> around you from
          doing anything for 2 actions.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attemptPreventActions: bindProps(TiledEffectImage, {
            imagePath: attackSnowballs,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attemptPreventActions: bindProps(TiledEffectImage, {
            imagePath: attackSnowballs,
            alpha: 1
          })
        }
      },
      preloadImages: [attackSnowballs]
    },

    "Lightning Hands": {
      image: forceLightning,
      description: (
        <>
          Deal <strong>1 damage</strong> to all players in a <strong>line</strong> in front and
          behind you, and knock them back 1 space.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: attackLightning,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: attackLightning,
            alpha: 1
          })
        }
      },
      preloadImages: [attackLightning]
    },

    "Spider Minions": {
      image: spiderMinions,
      description: (
        <>
          Deal <strong>1 damage</strong> to all players in a <strong>line</strong> in the 4
          directions around you, and knock them back 1 space.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: attackSpider,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(TiledEffectImage, {
            imagePath: attackSpider,
            alpha: 1
          })
        }
      },
      preloadImages: [attackSpider]
    },

    "Sonic Pulse": {
      image: piercingScream,
      description: (
        <>
          Deal <strong>2 damage</strong> to all players in a <strong>3x3 square</strong> around you.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: attackScream,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: attackScream,
            alpha: 1
          })
        }
      },
      preloadImages: [attackScream]
    },

    Earthquake: {
      image: earthquake,
      description: (
        <>
          Deal <strong>1 damage</strong> to all players.
        </>
      ),
      planViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: attackEarthquake,
            alpha: 0.75
          })
        }
      },
      realViewOverrides: {
        [OVERRIDE_UNDERLAY]: {
          attack: bindProps(StretchedEffectImage, {
            imagePath: attackEarthquake,
            alpha: 1
          })
        }
      },
      preloadImages: [attackEarthquake]
    },

    "Magical Shield": {
      image: magicalShield,
      description: (
        <>
          <strong>Shield</strong> yourself from damage for <strong>this action</strong> only.
        </>
      )
    },

    "Dimensional Leap": {
      image: dimension,
      description: (
        <>
          <strong>Shield</strong> yourself from damage for <strong>the rest of the turn</strong>.
        </>
      )
    },

    "Mirror Shield": {
      image: mirrorShield,
      description: (
        <>
          <strong>Reflect</strong> any damage you would normally take back at the attacker for{" "}
          <strong>this action</strong> only.
        </>
      )
    },

    "Interrupting Yell": {
      image: parentalYell,
      description: (
        <>
          <strong>Prevent</strong> all other players' cards from having any effect on{" "}
          <strong>this action</strong>.
        </>
      )
    },

    "Healing Drink": {
      image: healingDrink,
      description: (
        <>
          <strong>Heal 1 point</strong> of damage.
        </>
      )
    },

    "Healing Meal": {
      image: healingMeal,
      description: (
        <>
          <strong>Heal 2 points</strong> of damage.
        </>
      )
    },

    "Rage Potion": {
      image: ragePotion,
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
        north: darkLordNorth,
        south: darkLordSouth,
        east: darkLordEast,
        west: darkLordWest
      },
      heartImage: darkLordHeart
    },

    "Clever Cleric": {
      images: {
        north: clericNorth,
        south: clericSouth,
        east: clericEast,
        west: clericWest
      },
      heartImage: clericHeart
    },

    "Pure Paladin": {
      images: {
        north: paladinNorth,
        south: paladinSouth,
        east: paladinEast,
        west: paladinWest
      },
      heartImage: paladinHeart
    },

    "Adaptable Alchemist": {
      images: {
        north: alchemistNorth,
        south: alchemistSouth,
        east: alchemistEast,
        west: alchemistWest
      },
      heartImage: alchemistHeart
    },

    "Bold Battlemage": {
      images: {
        north: battlemageNorth,
        south: battlemageSouth,
        east: battlemageEast,
        west: battlemageWest
      },
      heartImage: battlemageHeart
    },

    "Grumpy Gnome": {
      images: {
        north: gnomeNorth,
        south: gnomeSouth,
        east: gnomeEast,
        west: gnomeWest
      },
      heartImage: gnomeHeart
    },

    "Indignant Imp": {
      images: {
        north: impNorth,
        south: impSouth,
        east: impEast,
        west: impWest
      },
      heartImage: impHeart
    },

    "Thuggish Troll": {
      images: {
        north: trollNorth,
        south: trollSouth,
        east: trollEast,
        west: trollWest
      },
      heartImage: trollHeart
    },

    "Warping Warlock": {
      images: {
        north: warlockNorth,
        south: warlockSouth,
        east: warlockEast,
        west: warlockWest
      },
      heartImage: warlockHeart
    }
  }
}

export default viewConfig
