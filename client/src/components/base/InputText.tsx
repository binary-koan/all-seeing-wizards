import React from "react"
import styled from "../util/styled"

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: lighten($color-muted, 10%);
`

const Input = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-radius: 0.375rem;
  background: none;
  color: white;
  transition: all 0.2s;

  &:focus {
    border-color: rgba(255, 255, 255, 0.5);
    background-color: rgba(255, 255, 255, 0.05);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }
`

interface InputTextProps {
  label: string
  placeholder?: string
  autoFocus?: boolean
  value?: string
  onChange?: (value: string) => void
}

const InputText: React.SFC<InputTextProps> = props => (
  <div>
    <Label>{props.label}</Label>
    <Input
      type="text"
      autoFocus={props.autoFocus}
      placeholder={props.placeholder}
      value={props.value}
      onChange={e => props.onChange && props.onChange((e.target as HTMLInputElement).value)}
    />
  </div>
)

export default InputText
