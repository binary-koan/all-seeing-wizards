import * as styledComponents from "styled-components"

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<AppTheme>

export interface AppTheme {
  colorDark: string
  colorMuted: string
  colorPrimary: string
  colorDanger: string
}

export const theme = {
  colorDark: "#20263d",
  colorMuted: "#8b8e9a",
  colorPrimary: "#eca858",
  colorDanger: "#f44236"
}

export default styled
export { css, injectGlobal, keyframes, ThemeProvider }
