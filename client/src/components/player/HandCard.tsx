import React from "react"
import { Card } from "../../../../common/src/state/card"
import { CardTypeIcon } from "../card/CardType"
import styled from "../util/styled"

import data from "../../../packs/base/viewConfig"

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
  onClick: () => void
  onLongPress: () => void
}

function abbreviateName(name: string) {
  return name.replace("Clockwise", "").replace("Anticlockwise", "")
}

const LONG_PRESS_DELAY = 700

class HandCard extends React.Component<HandCardProps> {
  private longPressTimer: any
  private wasLongPressed: boolean

  constructor(props: HandCardProps) {
    super(props)

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }

  public render() {
    return (
      <Wrapper
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        disabled={this.props.isPicked}
      >
        <Content>
          <TypeIcon card={this.props.card} />
          <CardImage
            src={data.cards[this.props.card.name] && data.cards[this.props.card.name].image}
          />
          {abbreviateName(this.props.card.name)}
        </Content>
      </Wrapper>
    )
  }

  private onMouseDown() {
    this.wasLongPressed = false

    this.longPressTimer = setTimeout(() => {
      this.props.onLongPress()
      this.wasLongPressed = true
    }, LONG_PRESS_DELAY)
  }

  private onMouseUp() {
    if (!this.wasLongPressed) {
      clearTimeout(this.longPressTimer)
      this.props.onClick()
    }
  }
}

export default HandCard
