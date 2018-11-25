import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { Card } from "../../../../common/src/state/card"
import { Action, showCardDetails } from "../../state/actions"
import ViewState from "../../state/viewState"
import styled from "../util/styled"

import data from "../../../packs/base/viewConfig"
import { CardTypeIcon, CardTypeName } from "./CardType"

interface VisibleProps {
  isVisible: boolean
}

const Overlay = styled.div<VisibleProps>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: all 0.2s;
`

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  max-width: 22rem;
  max-height: 35rem;
  transform: translateX(-50%) translateY(-50%);
  padding: 1rem;
`

const CardView = styled.div<VisibleProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 3rem 1rem;
  border-radius: 0.25rem;
  background: white;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: ${props => props.theme.colorDark};
  transform: ${props => (props.isVisible ? "none" : "scale(0.7)")};
  transition: all 0.2s;
`

const CloseButton = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.2);
`

const Title = styled.h2`
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  margin: 0;
`

const CardImage = styled.img`
  width: 6rem;
  margin: 0 auto;
`

const CardTypeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledCardTypeIcon = styled(CardTypeIcon)`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.25rem;
`

const DescriptionContainer = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  line-height: 1.5;
`

interface StateProps {
  card?: Card
}

interface DispatchProps {
  close: () => void
}

const CardDetails: React.SFC<StateProps & DispatchProps> = props => (
  <Overlay isVisible={Boolean(props.card)} onClick={props.close}>
    <Wrapper>
      <CardView isVisible={Boolean(props.card)}>
        {props.card ? (
          <div>
            <CloseButton>&times;</CloseButton>
            <CardImage src={data.cards[props.card.name] && data.cards[props.card.name].image} />
            <Title>{props.card.name}</Title>
            {props.card.tagline ? <Subtitle>of {props.card.tagline}</Subtitle> : null}
            <CardTypeContainer>
              <StyledCardTypeIcon card={props.card} />
              <CardTypeName card={props.card} />
            </CardTypeContainer>
            <DescriptionContainer>
              {data.cards[props.card.name] && data.cards[props.card.name].description}
            </DescriptionContainer>
          </div>
        ) : null}
      </CardView>
    </Wrapper>
  </Overlay>
)

function mapStateToProps(state: ViewState): StateProps {
  return { card: state.showingCardDetails }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    close: () => dispatch(showCardDetails(undefined))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardDetails)
