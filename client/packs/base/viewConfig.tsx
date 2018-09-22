import DefaultPlanView from "../../src/components/map/results/DefaultPlanView"
import { ViewConfig } from "../types"

const viewConfig: ViewConfig = {
  cards: {
    "Move 1": {
      image: require("./cards/forward-1.png"),
      plannedResults: DefaultPlanView
    },
    "Move 2": {
      image: require("./cards/forward-2.png"),
      plannedResults: DefaultPlanView
    },
    "Turn Clockwise & Move": {
      image: require("./cards/turn-right-move.png"),
      plannedResults: DefaultPlanView
    },
    "Turn Anticlockwise & Move": {
      image: require("./cards/turn-left-move.png"),
      plannedResults: DefaultPlanView
    },
    "Turn Around & Move": {
      image: require("./cards/turn-around-move.png"),
      plannedResults: DefaultPlanView
    },
    "Hellfire Breath": {
      image: require("./cards/hellfire-breath.png"),
      plannedResults: DefaultPlanView
    },
    "Chaos Storm": {
      image: require("./cards/chaos-storm.png"),
      plannedResults: DefaultPlanView
    },
    "Magical Dart": {
      image: require("./cards/magical-dart.png"),
      plannedResults: DefaultPlanView
    },
    "Spartan Kick": {
      image: require("./cards/spartan-kick.png"),
      plannedResults: DefaultPlanView
    },
    "Homing Missile": {
      image: require("./cards/homing-missiles.png"),
      plannedResults: DefaultPlanView
    },
    "Freezing Touch": {
      image: require("./cards/freezing-touch.png"),
      plannedResults: DefaultPlanView
    },
    "Yellow Snowballs": {
      image: require("./cards/yellow-snowballs.png"),
      plannedResults: DefaultPlanView
    },
    "Force Lightning": {
      image: require("./cards/force-lightning.png"),
      plannedResults: DefaultPlanView
    },
    "Spider Minions": {
      image: require("./cards/spider-minions.png"),
      plannedResults: DefaultPlanView
    },
    "Piercing Scream": {
      image: require("./cards/piercing-scream.png"),
      plannedResults: DefaultPlanView
    },
    Earthquake: {
      image: require("./cards/earthquake.png"),
      plannedResults: DefaultPlanView
    },
    "Magical Shield": {
      image: require("./cards/magical-shield.png"),
      plannedResults: DefaultPlanView
    },
    Dimension: {
      image: require("./cards/dimension.png"),
      plannedResults: DefaultPlanView
    },
    "Mirror Shield": {
      image: require("./cards/mirror-shield.png"),
      plannedResults: DefaultPlanView
    },
    "Parental Yell": {
      image: require("./cards/parental-yell.png"),
      plannedResults: DefaultPlanView
    },
    "Healing Drink": {
      image: require("./cards/healing-drink.png"),
      plannedResults: DefaultPlanView
    },
    "Healing Meal": {
      image: require("./cards/healing-meal.png"),
      plannedResults: DefaultPlanView
    },
    "Rage Potion": {
      image: require("./cards/rage-potion.png"),
      plannedResults: DefaultPlanView
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
