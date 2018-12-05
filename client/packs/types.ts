import { Direction } from "../../common/src/state/directionalPoint"
import { ResultViewOverrides } from "../src/components/map/results/ResultViewProps"

export interface ViewConfig {
  cards: {
    [name: string]: {
      image: string
      description?: JSX.Element
      planViewOverrides?: ResultViewOverrides
      realViewOverrides?: ResultViewOverrides
      preloadImages?: string[]
    }
  }
  characters: {
    [name: string]: {
      images: { [direction in Direction]: string }
      heartImage: string
    }
  }
}
