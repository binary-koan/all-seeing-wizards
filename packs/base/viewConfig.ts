import { ViewConfig } from "../types"

import alchemistImage from "./players/arcane-alchemist.png"
import darkLordImage from "./players/despicable-dark-lord.png"
import magicianImage from "./players/midas-magician.png"
import paladinImage from "./players/pure-paladin.png"
import windWorkerImage from "./players/wily-wind-worker.png"

import chaosStormImage from "./cards/chaos-storm.png"
import dimensionImage from "./cards/dimension.png"
import earthquakeImage from "./cards/earthquake.png"
import forceLightningImage from "./cards/force-lightning.png"
import forward1Image from "./cards/forward-1.png"
import forward2Image from "./cards/forward-2.png"
import freezingTouchImage from "./cards/freezing-touch.png"
import healingDrinkImage from "./cards/healing-drink.png"
import healingMealImage from "./cards/healing-meal.png"
import hellfireBreathImage from "./cards/hellfire-breath.png"
import homingMissilesImage from "./cards/homing-missiles.png"
import magicalDartImage from "./cards/magical-dart.png"
import magicalShieldImage from "./cards/magical-shield.png"
import mirrorShieldImage from "./cards/mirror-shield.png"
import parentalYellImage from "./cards/parental-yell.png"
import piercingScreamImage from "./cards/piercing-scream.png"
import ragePotionImage from "./cards/rage-potion.png"
import spartanKickImage from "./cards/spartan-kick.png"
import spiderMinionsImage from "./cards/spider-minions.png"
import turnAroundMoveImage from "./cards/turn-around-move.png"
import turnLeftMoveImage from "./cards/turn-left-move.png"
import turnRightMoveImage from "./cards/turn-right-move.png"
import yellowSnowballsImage from "./cards/yellow-snowballs.png"

const viewConfig: ViewConfig = {
  cards: {
    "Move 1": {
      image: forward1Image
    },
    "Move 2": {
      image: forward2Image
    },
    "Turn Clockwise & Move": {
      image: turnRightMoveImage
    },
    "Turn Anticlockwise & Move": {
      image: turnLeftMoveImage
    },
    "Turn Around & Move": {
      image: turnAroundMoveImage
    },
    "Hellfire Breath": {
      image: hellfireBreathImage
    },
    "Chaos Storm": {
      image: chaosStormImage
    },
    "Magical Dart": {
      image: magicalDartImage
    },
    "Spartan Kick": {
      image: spartanKickImage
    },
    "Homing Missile": {
      image: homingMissilesImage
    },
    "Freezing Touch": {
      image: freezingTouchImage
    },
    "Yellow Snowballs": {
      image: yellowSnowballsImage
    },
    "Force Lightning": {
      image: forceLightningImage
    },
    "Spider Minions": {
      image: spiderMinionsImage
    },
    "Piercing Scream": {
      image: piercingScreamImage
    },
    Earthquake: {
      image: earthquakeImage
    },
    "Magical Shield": {
      image: magicalShieldImage
    },
    Dimension: {
      image: dimensionImage
    },
    "Mirror Shield": {
      image: mirrorShieldImage
    },
    "Parental Yell": {
      image: parentalYellImage
    },
    "Healing Drink": {
      image: healingDrinkImage
    },
    "Healing Meal": {
      image: healingMealImage
    },
    "Rage Potion": {
      image: ragePotionImage
    }
  },
  characters: {
    "Despicable Dark Lord": {
      image: darkLordImage,
      darkColor: "var(--dark-color)",
      lightColor: "var(--dark-color)"
    },
    "Wily Wind Worker": {
      image: windWorkerImage,
      darkColor: "var(--blue-dark)",
      lightColor: "var(--blue)"
    },
    "Pure Paladin": {
      image: paladinImage,
      darkColor: "var(--orange-dark)",
      lightColor: "var(--orange)"
    },
    "Arcane Alchemist": {
      image: alchemistImage,
      darkColor: "var(--green-dark)",
      lightColor: "var(--green)"
    },
    "Midas Magician": {
      image: magicianImage,
      darkColor: "var(--yellow-dark)",
      lightColor: "var(--yellow)"
    }
  }
}

export default viewConfig
