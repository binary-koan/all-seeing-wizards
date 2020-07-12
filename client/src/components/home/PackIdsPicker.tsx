import { List } from "immutable"
import { lighten } from "polished"
import React, { FunctionComponent, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPacks } from "../../state/actions"
import ViewState from "../../state/viewState"
import styled from "../util/styled"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const Label = styled.label``

const Option = styled.button<{ isActive: boolean }>`
  line-height: calc(3rem - 4px);
  margin-left: 1rem;
  padding: 0 1rem;
  border: 2px solid ${props => props.theme.colorMuted};
  border-radius: 100rem;
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

interface PackIdsPickerProps {
  value: List<string>
  onChange: (value: List<string>) => void
}

const PackIdsPicker: FunctionComponent<PackIdsPickerProps> = props => {
  const packs = useSelector((state: ViewState) => state.packs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPacks())
  }, [])

  if (!packs) return null

  return (
    <Wrapper>
      <Label>Pack</Label>
      {packs.toArray().map(pack => (
        <Option
          key={pack.id}
          isActive={props.value.includes(pack.id)}
          onClick={() => props.onChange(List([pack.id]))}
        >
          {pack.name}
        </Option>
      ))}
    </Wrapper>
  )
}

export default PackIdsPicker
