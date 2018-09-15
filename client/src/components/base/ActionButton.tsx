import { lighten } from "polished"
import styled from "../util/styled"

type ButtonType = "primary" | "secondary"

export default styled<{ type: ButtonType }, "button">("button")`
  display: block;
  width: 100%;
  padding: 1rem 2rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  background-color: ${props =>
    props.type === "secondary" ? props.theme.colorMuted : props.theme.colorPrimary};
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
  color: ${props => props.theme.colorDark};
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;

  &:hover,
  &:focus {
    background-color: ${props =>
      lighten(
        0.05,
        props.type === "secondary" ? props.theme.colorMuted : props.theme.colorPrimary
      )};
  }

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media screen and (min-width: 1000px) {
    padding: 1.25rem 2.5rem;
    font-size: 1.375rem;
  }
`
