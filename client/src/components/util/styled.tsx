import { lighten } from "polished"
import * as styledComponents from "styled-components"

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<AppTheme>

export interface AppTheme {
  colorDarkest: string
  colorDark: string
  colorMuted: string
  colorPrimary: string
  colorDanger: string
}

export const theme = {
  colorDarkest: "#20263d",
  colorDark: lighten(0.1, "#20263d"),
  colorMuted: "#8b8e9a",
  colorPrimary: "#eca858",
  colorDanger: "#f44236"
}

export default styled
export { css, createGlobalStyle, keyframes, ThemeProvider }
