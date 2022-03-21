import { lighten } from "polished"
import React, { FunctionComponent } from "react"
import styled from "../util/styled"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const Label = styled.label``

const Option = styled.button<{ isActive: boolean }>`
  width: 3rem;
  line-height: calc(3rem - 4px);
  margin-left: 1rem;
  padding: 0;
  border: 2px solid ${props => props.theme.colorMuted};
  border-radius: 100%;
  background-color: ${props => (props.isActive ? props.theme.colorMuted : "transparent")};
  color: ${props => (props.isActive ? props.theme.colorDarkest : "white")};
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover,
  &:focus {
    border-color: ${props => lighten(0.1, props.theme.colorMuted)};
    background-color: ${props =>
      props.isActive ? lighten(0.1, props.theme.colorMuted) : "transparent"};
  }

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`

interface BoardSizePickerProps {
  value: number
  onChange: (value: number) => void
}

const BoardSizePicker: FunctionComponent<BoardSizePickerProps> = props => {
  const options = [2, 4, 6, 8]

  return (
    <Wrapper>
      <Label>Max Players</Label>
      {options.map(option => (
        <Option
          key={option}
          isActive={props.value === option}
          onClick={() => props.onChange(option)}
        >
          {option}
        </Option>
      ))}
    </Wrapper>
  )
}

export default BoardSizePicker
