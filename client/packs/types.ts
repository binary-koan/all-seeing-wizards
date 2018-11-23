import { Direction } from "../../common/src/state/directionalPoint"
import { PlanViewOverrides } from "../src/components/map/results/PlanViewProps"

export interface ViewConfig {
  cards: {
    [name: string]: {
      image: string
      planViewOverrides?: PlanViewOverrides
    }
  }
  characters: {
    [name: string]: {
      images: { [direction in Direction]: string }
      color: string
    }
  }
}
