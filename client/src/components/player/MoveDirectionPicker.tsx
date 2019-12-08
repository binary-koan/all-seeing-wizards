import React, { FunctionComponent } from "react"
import { Direction } from "../../../../common/src/state/directionalPoint"
import styled from "../util/styled"

import arrowUpImage from "../../../assets/arrow-up.png"

const Title = styled.h2`
  margin-bottom: 1.5rem;
`

const ButtonArea = styled.div`
  display: inline-grid;
  grid-template-areas: "topleft top topright" "left center right" "bottomleft bottom bottomright";
`

const MoveButton = styled.button`
  border: none;
  padding: 0;
  width: 4rem;
  height: 4rem;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;

  &:hover,
  &:active {
    transform: scale(1.2);
  }
`

const MoveImage = styled.img`
  width: 4rem;
  height: 4rem;
`

const UpButton = styled(MoveButton)`
  grid-area: top;
`

const LeftButton = styled(MoveButton)`
  grid-area: left;

  > ${MoveImage} {
    transform: rotate(-90deg);
  }
`

const RightButton = styled(MoveButton)`
  grid-area: right;

  > ${MoveImage} {
    transform: rotate(90deg);
  }
`

const DownButton = styled(MoveButton)`
  grid-area: bottom;

  > ${MoveImage} {
    transform: rotate(180deg);
  }
`

const MoveDirectionPicker: FunctionComponent<{ onConfigured: (direction: Direction) => void }> = ({
  onConfigured
}) => {
  return (
    <>
      <Title>Which direction?</Title>

      <ButtonArea>
        <UpButton onClick={() => onConfigured("north")}>
          <MoveImage src={arrowUpImage} />
        </UpButton>
        <LeftButton onClick={() => onConfigured("west")}>
          <MoveImage src={arrowUpImage} />
        </LeftButton>
        <RightButton onClick={() => onConfigured("east")}>
          <MoveImage src={arrowUpImage} />
        </RightButton>
        <DownButton onClick={() => onConfigured("south")}>
          <MoveImage src={arrowUpImage} />
        </DownButton>
      </ButtonArea>
    </>
  )
}

export default MoveDirectionPicker
