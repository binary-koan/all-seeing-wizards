import alchemistImage from "./players/arcane-alchemist.png"
import darkLordImage from "./players/despicable-dark-lord.png"
import magicianImage from "./players/midas-magician.png"
import paladinImage from "./players/pure-paladin.png"
import windWorkerImage from "./players/wily-wind-worker.png"

export default {
  cardIcons: {
    "Move 1": "arrow-up",
    "Move 2": "arrow-up-circle",
    "Turn Clockwise & Move": "corner-up-right",
    "Turn Anticlockwise & Move": "corner-up-left",
    "Turn Around & Move": "arrow-down",
    "Hellfire Breath": "sun",
    "Chaos Storm": "cloud-lightning",
    "Magical Dart": "send",
    "Spartan Kick": "log-in",
    "Homing Missile": "git-branch",
    "Freezing Touch": "box",
    "Yellow Snowballs": "cloud-snow",
    "Force Lightning": "zap",
    "Spider Minions": "more-vertical",
    "Piercing Scream": "radio",
    Earthquake: "activity",
    "Magical Shield": "shield",
    Dimension: "x-square",
    "Mirror Shield": "external-link",
    Decree: "thumbs-down",
    "Healing Potion": "plus-square",
    "Rage Potion": "eye"
  } as { [key: string]: string },
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
  } as { [key: string]: { image: string; darkColor: string; lightColor: string } }
}
