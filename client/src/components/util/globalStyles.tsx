import { normalize } from "polished"
import { createGlobalStyle } from "./styled"

// tslint:disable-next-line:no-unused-expression
export default createGlobalStyle`
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
    color: white;
  }

  body > div {
    height: 100%;
  }
`
