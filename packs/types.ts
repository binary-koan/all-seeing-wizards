import { ActionResult } from "../common/src/turnResults/resultTypes"

export interface ResultDisplay {
  tag: string
  className?: string
}

export interface ViewConfig {
  cards: {
    [name: string]: {
      image: string
      resultDisplays?: {
        [resultType: string]: (result: ActionResult) => ResultDisplay[]
      }
    }
  }
  characters: {
    [name: string]: {
      image: string
      darkColor: string
      lightColor: string
    }
  }
}
