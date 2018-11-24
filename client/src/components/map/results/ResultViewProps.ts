import { ActionResult } from "../../../../../common/src/turnResults/resultTypes"

export const OVERRIDE_UNDERLAY = "underlay"
export const OVERRIDE_OVERLAY = "overlay"

export interface ResultViewOverrides {
  [OVERRIDE_UNDERLAY]?: {
    [type: string]: React.SFC<{ result: ActionResult }>
  }

  [OVERRIDE_OVERLAY]?: {
    [type: string]: React.SFC<{ result: ActionResult }>
  }
}

export interface ResultViewProps {
  result: ActionResult
  overrides: ResultViewOverrides
}
