import DefaultPlanView from "../../src/components/map/results/DefaultPlanView"
import StretchedAttackImage from "../../src/components/map/results/StretchedAttackImage"
import TiledAttackImage from "../../src/components/map/results/TiledAttackImage"
import bindProps from "../../src/components/util/bindProps"
import { ViewConfig } from "../types"

const viewConfig: ViewConfig = {
  cards: {
    "Move 1": {
      image: require("./cards/forward-1.png"),
      planView: DefaultPlanView
    },
    "Move 2": {
      image: require("./cards/forward-2.png"),
      planView: DefaultPlanView
    },
    "Turn Clockwise & Move": {
      image: require("./cards/turn-right-move.png"),
      planView: DefaultPlanView
    },
    "Turn Anticlockwise & Move": {
      image: require("./cards/turn-left-move.png"),
      planView: DefaultPlanView
    },
    "Turn Around & Move": {
      image: require("./cards/turn-around-move.png"),
      planView: DefaultPlanView
    },
    "Hellfire Breath": {
      image: require("./cards/hellfire-breath.png"),
      planView: bindProps(StretchedAttackImage, { imagePath: require("./effects/attack-fire.png") })
    },
    "Chaos Storm": {
      image: require("./cards/chaos-storm.png"),
      planView: bindProps(StretchedAttackImage, {
        imagePath: require("./effects/attack-storm.png")
      })
    },
    "Magical Dart": {
      image: require("./cards/magical-dart.png"),
      planView: DefaultPlanView
    },
    "Spartan Kick": {
      image: require("./cards/spartan-kick.png"),
      planView: DefaultPlanView
    },
    "Homing Missile": {
      image: require("./cards/homing-missiles.png"),
      planView: bindProps(TiledAttackImage, { imagePath: require("./effects/attack-homing.png") })
    },
    "Freezing Touch": {
      image: require("./cards/freezing-touch.png"),
      planView: bindProps(TiledAttackImage, { imagePath: require("./effects/attack-freeze.png") })
    },
    "Yellow Snowballs": {
      image: require("./cards/yellow-snowballs.png"),
      planView: bindProps(TiledAttackImage, {
        imagePath: require("./effects/attack-snowballs.png")
      })
    },
    "Force Lightning": {
      image: require("./cards/force-lightning.png"),
      planView: bindProps(TiledAttackImage, {
        imagePath: require("./effects/attack-lightning.png")
      })
    },
    "Spider Minions": {
      image: require("./cards/spider-minions.png"),
      planView: bindProps(TiledAttackImage, { imagePath: require("./effects/attack-spider.png") })
    },
    "Piercing Scream": {
      image: require("./cards/piercing-scream.png"),
      planView: bindProps(StretchedAttackImage, {
        imagePath: require("./effects/attack-scream.png")
      })
    },
    Earthquake: {
      image: require("./cards/earthquake.png"),
      planView: bindProps(StretchedAttackImage, {
        imagePath: require("./effects/attack-earthquake.png")
      })
    },
    "Magical Shield": {
      image: require("./cards/magical-shield.png"),
      planView: DefaultPlanView
    },
    Dimension: {
      image: require("./cards/dimension.png"),
      planView: DefaultPlanView
    },
    "Mirror Shield": {
      image: require("./cards/mirror-shield.png"),
      planView: DefaultPlanView
    },
    "Parental Yell": {
      image: require("./cards/parental-yell.png"),
      planView: DefaultPlanView
    },
    "Healing Drink": {
      image: require("./cards/healing-drink.png"),
      planView: DefaultPlanView
    },
    "Healing Meal": {
      image: require("./cards/healing-meal.png"),
      planView: DefaultPlanView
    },
    "Rage Potion": {
      image: require("./cards/rage-potion.png"),
      planView: DefaultPlanView
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
    "Adaptable Alchemist": {
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
