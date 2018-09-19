import React from "react"
import { Card } from "../../../../common/src/state/card"
import styled from "../util/styled"

const Wrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 6rem;
  margin: 0.25rem;
  background-color: white;
  border-radius: 0.25rem;
`

interface HandCardProps {
  card: Card
}

const HandCard: React.SFC<HandCardProps> = props => <Wrapper>{props.card.name}</Wrapper>

export default HandCard
