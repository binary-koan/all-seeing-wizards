import React from "react"
import { connect } from "react-redux"
import ViewState from "../state/viewState"
import CardDetails from "./card/CardDetails"
import { ImagePreloader } from "./ImagePreloader"
import PlayerMapView from "./map/PlayerMapView"
import CardChooser from "./player/CardChooser"
import CharacterChooser from "./player/CharacterChooser"
import PlayerHeader from "./player/PlayerHeader"
import PrimaryAction from "./player/PrimaryAction"
import styled from "./util/styled"

const CONTAINER_WIDTH = 600

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: ${props => props.theme.colorDark};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
`

const MapWrapper = styled.div`
  flex: 0 1 auto;
  min-height: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
`

interface StateProps {
  hasCharacter: boolean
}

const Player: React.SFC<StateProps> = props => (
  <ImagePreloader>
    {() => (
      <Wrapper>
        {props.hasCharacter ? (
          <>
            <PlayerHeader />
            <MapWrapper>
              <PlayerMapView maxWidth={CONTAINER_WIDTH} />
            </MapWrapper>
            <CardChooser />
            <PrimaryAction />
            <CardDetails />
          </>
        ) : (
          <CharacterChooser />
        )}
      </Wrapper>
    )}
  </ImagePreloader>
)

function mapStateToProps(state: ViewState): StateProps {
  return { hasCharacter: Boolean(state.player.character) }
}

export default connect(mapStateToProps)(Player)
