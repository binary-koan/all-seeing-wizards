import React from "react"
import { Card } from "../../../../common/src/state/card"
import styled from "../util/styled"

const Wrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 6rem;
  padding: 0.25rem;
  border: none;
  border-radius: 0.25rem;
  background-color: white;
  font-size: 0.75rem;
`

interface HandCardProps {
  card: Card
  isPicked: boolean
  onClick?: () => void
}

const HandCard: React.SFC<HandCardProps> = props => (
  <Wrapper onClick={props.onClick} disabled={props.isPicked}>
    {props.card.name}
  </Wrapper>
)

export default HandCard
