import { OVERRIDE_UNDERLAY } from "../../src/components/map/results/ResultViewProps"
import StretchedEffectImage from "../../src/components/map/results/StretchedEffectImage"
import TiledEffectImage from "../../src/components/map/results/TiledEffectImage"
import bindProps from "../../src/components/util/bindProps"
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
      image: require("./cards/hellfire-breath.png"),
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
      image: require("./cards/magical-dart.png")
    },

    "Spartan Kick": {
      image: require("./cards/spartan-kick.png")
    },

    "Homing Missile": {
      image: require("./cards/homing-missiles.png"),
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
