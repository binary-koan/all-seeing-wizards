import { List } from "immutable"
import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { ACTIONS_PER_TURN } from "../../../../common/src/performTurn"
import { CardEffectType } from "../../../../common/src/state/cardEffect"
import { ActionResult, ActionResultType } from "../../../../common/src/turnResults/resultTypes"
import ViewState from "../../state/viewState"
import { EffectIcon } from "../card/CardType"
import styled from "../util/styled"

type Phase = "priority" | "move" | "attack"
const phases: Phase[] = ["priority", "move", "attack"]

const effectMapping: { [type in Phase]: CardEffectType } = {
  priority: "increaseDamage",
  move: "move",
  attack: "attack"
}

const resultTypeMapping: { [type in ActionResultType]: Phase } = {
  attack: "attack",
  attemptPreventActions: "priority",
  grantMirrorShield: "priority",
  grantShield: "priority",
  heal: "priority",
  increaseDamage: "priority",
  knockback: "attack",
  move: "move",
  movePrevented: "move",
  none: "priority",
  preventActions: "priority",
  shieldFromHarm: "attack",
  takeDamage: "attack",
  setAbility: "priority"
}

const Wrapper = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
`

const ActionWrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background: ${props => (props.isActive ? "white" : props.theme.colorMuted)};

  &:first-child {
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }

  &:last-child {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
`

const ActionItem = styled.div<{ isActive: boolean; isVisible: boolean }>`
  padding: 0.5rem 0.75rem;
  color: ${props => props.theme.colorDarkest};
  font-weight: bold;
  opacity: ${props => (props.isActive ? 1 : 0.25)};
  display: ${props => (props.isVisible ? "block" : "none")};
`

const ActionIndicator = styled(EffectIcon)`
  width: 1.5rem;
  height: 1.5rem;
`

const TurnIndicator: FunctionComponent = () => {
  const showingResults: List<ActionResult> =
    useSelector((state: ViewState) => state.showingResults) || List()
  const actionIndex = useSelector((state: ViewState) => state.showingActionIndex)

  return (
    <Wrapper isVisible={showingResults && Boolean(showingResults.size)}>
      {Array(ACTIONS_PER_TURN)
        .fill(0)
        .map((_, index) => (
          <ActionWrapper key={index} isActive={index === actionIndex}>
            <ActionItem isActive={true} isVisible={true}>
              {index + 1}
            </ActionItem>
            {phases.map(phase => (
              <ActionItem
                key={phase}
                isVisible={index === actionIndex}
                isActive={showingResults.some(result => resultTypeMapping[result.type] === phase)}
              >
                <ActionIndicator effects={[effectMapping[phase]]} />
              </ActionItem>
            ))}
          </ActionWrapper>
        ))}
    </Wrapper>
  )
}

export default TurnIndicator
