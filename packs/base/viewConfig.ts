import { ViewConfig } from "../types"

const viewConfig: ViewConfig = {
  cards: {
    "Move 1": {
      image: require("./cards/forward-1.png")
    },
    "Move 2": {
      image: require("./cards/forward-2.png")
    },
    "Turn Clockwise & Move": {
      image: require("./cards/turn-right-move.png")
    },
    "Turn Anticlockwise & Move": {
      image: require("./cards/turn-left-move.png")
    },
    "Turn Around & Move": {
      image: require("./cards/turn-around-move.png")
    },
    "Hellfire Breath": {
      image: require("./cards/hellfire-breath.png")
    },
    "Chaos Storm": {
      image: require("./cards/chaos-storm.png")
    },
    "Magical Dart": {
      image: require("./cards/magical-dart.png")
    },
    "Spartan Kick": {
      image: require("./cards/spartan-kick.png")
    },
    "Homing Missile": {
      image: require("./cards/homing-missiles.png")
    },
    "Freezing Touch": {
      image: require("./cards/freezing-touch.png")
    },
    "Yellow Snowballs": {
      image: require("./cards/yellow-snowballs.png")
    },
    "Force Lightning": {
      image: require("./cards/force-lightning.png")
    },
    "Spider Minions": {
      image: require("./cards/spider-minions.png")
    },
    "Piercing Scream": {
      image: require("./cards/piercing-scream.png")
    },
    Earthquake: {
      image: require("./cards/earthquake.png")
    },
    "Magical Shield": {
      image: require("./cards/magical-shield.png")
    },
    Dimension: {
      image: require("./cards/dimension.png")
    },
    "Mirror Shield": {
      image: require("./cards/mirror-shield.png")
    },
    "Parental Yell": {
      image: require("./cards/parental-yell.png")
    },
    "Healing Drink": {
      image: require("./cards/healing-drink.png")
    },
    "Healing Meal": {
      image: require("./cards/healing-meal.png")
    },
    "Rage Potion": {
      image: require("./cards/rage-potion.png")
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
      color: "#6A7787"
    },
    "Clever Cleric": {
      images: {
        north: require("./players/cleric-north.png"),
        south: require("./players/cleric-south.png"),
        east: require("./players/cleric-east.png"),
        west: require("./players/cleric-west.png")
      },
      color: "#F44236"
    },
    "Pure Paladin": {
      images: {
        north: require("./players/paladin-north.png"),
        south: require("./players/paladin-south.png"),
        east: require("./players/paladin-east.png"),
        west: require("./players/paladin-west.png")
      },
      color: "#EC9E42"
    },
    "Arcane Alchemist": {
      images: {
        north: require("./players/alchemist-north.png"),
        south: require("./players/alchemist-south.png"),
        east: require("./players/alchemist-east.png"),
        west: require("./players/alchemist-west.png")
      },
      color: "#677821"
    }
  }
}

export default viewConfig
