import { normalize } from "polished"
import { injectGlobal } from "styled-components"

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  ${normalize()}

  * {
    box-sizing: border-box;
  }

  button,
  input,
  select,
  textarea {
    text-align: inherit;
  }

  html,
  body {
    height: 100%;
    font-family: "Signika Negative", sans-serif;
    background-color: #20263d;
  }

  body > div {
    height: 100%;
  }
`
