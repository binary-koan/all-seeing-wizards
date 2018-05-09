import { ViewConfig } from "../types"

import alchemistImage from "./players/arcane-alchemist.png"
import darkLordImage from "./players/despicable-dark-lord.png"
import magicianImage from "./players/midas-magician.png"
import paladinImage from "./players/pure-paladin.png"
import windWorkerImage from "./players/wily-wind-worker.png"

const viewConfig: ViewConfig = {
  cards: {
    "Move 1": {
      icon: "arrow-up"
    },
    "Move 2": {
      icon: "arrow-up-circle"
    },
    "Turn Clockwise & Move": {
      icon: "corner-up-right"
    },
    "Turn Anticlockwise & Move": {
      icon: "corner-up-left"
    },
    "Turn Around & Move": {
      icon: "arrow-down"
    },
    "Hellfire Breath": {
      icon: "sun"
    },
    "Chaos Storm": {
      icon: "cloud-lightning"
    },
    "Magical Dart": {
      icon: "send"
    },
    "Spartan Kick": {
      icon: "log-in"
    },
    "Homing Missile": {
      icon: "git-branch"
    },
    "Freezing Touch": {
      icon: "box"
    },
    "Yellow Snowballs": {
      icon: "cloud-snow"
    },
    "Force Lightning": {
      icon: "zap"
    },
    "Spider Minions": {
      icon: "more-vertical"
    },
    "Piercing Scream": {
      icon: "radio"
    },
    Earthquake: {
      icon: "activity"
    },
    "Magical Shield": {
      icon: "shield"
    },
    Dimension: {
      icon: "x-square"
    },
    "Mirror Shield": {
      icon: "external-link"
    },
    Decree: {
      icon: "thumbs-down"
    },
    "Healing Potion": {
      icon: "plus-square"
    },
    "Rage Potion": {
      icon: "eye"
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
