import { Direction } from "../../common/src/state/directionalPoint"
import { ActionResult } from "../../common/src/turnResults/resultTypes"

export type PlannedResultComponent = React.SFC<{ result: ActionResult }>

export interface ViewConfig {
  cards: {
    [name: string]: {
      image: string
      planView: PlannedResultComponent
    }
  }
  characters: {
    [name: string]: {
      images: { [direction in Direction]: string }
      color: string
    }
  }
}
