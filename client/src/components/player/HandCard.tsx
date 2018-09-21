import React from "react"
import { Card } from "../../../../common/src/state/card"
import CardTypeIcon from "../card/CardTypeIcon"
import styled from "../util/styled"

import data from "../../../../packs/base/viewConfig"

const Wrapper = styled.button`
  position: relative;
  min-height: 6rem;
  padding: 0.5rem 0.25rem;
  border: none;
  border-radius: 0.25rem;
  background-color: white;
  font-size: 0.75rem;
  cursor: pointer;

  &[disabled] {
    opacity: 0.8;
  }
`

const Content = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
`

const CardImage = styled.img`
  width: 70%;
  margin-bottom: 0.5rem;
`

const TypeIcon = styled(CardTypeIcon)`
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  width: 1rem;
`

interface HandCardProps {
  card: Card
  isPicked: boolean
  onClick?: () => void
}

function abbreviateName(name: string) {
  return name.replace("Clockwise", "").replace("Anticlockwise", "")
}

const HandCard: React.SFC<HandCardProps> = props => (
  <Wrapper onClick={props.onClick} disabled={props.isPicked}>
    <Content>
      <TypeIcon card={props.card} />
      <CardImage src={data.cards[props.card.name] && data.cards[props.card.name].image} />
      {abbreviateName(props.card.name)}
    </Content>
  </Wrapper>
)

export default HandCard
