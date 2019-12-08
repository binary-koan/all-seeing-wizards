import { lighten } from "polished"
import styled from "../util/styled"

type ButtonVariant = "primary" | "secondary"

export default styled("button")<{ variant: ButtonVariant }>`
  display: block;
  width: 100%;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.375rem;
  background-color: ${props =>
    props.variant === "secondary" ? props.theme.colorMuted : props.theme.colorPrimary};
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
  color: ${props => props.theme.colorDarkest};
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;

  &:hover,
  &:focus {
    background-color: ${props =>
      lighten(
        0.05,
        props.variant === "secondary" ? props.theme.colorMuted : props.theme.colorPrimary
      )};
  }

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &[disabled] {
    pointer-events: none;
    cursor: default;
  }

  @media screen and (min-width: 1000px) {
    padding: 1.25rem 2.5rem;
    font-size: 1.375rem;
  }
`
