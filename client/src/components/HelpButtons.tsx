import React, { FunctionComponent, useState } from "react"
import cardAttack from "../../assets/card-types/attack.png"
import cardHeal from "../../assets/card-types/heal.png"
import cardMove from "../../assets/card-types/move.png"
import cardPowerUp from "../../assets/card-types/power-up.png"
import cardPreventActions from "../../assets/card-types/prevent-actions.png"
import cardShield from "../../assets/card-types/shield.png"
import cardsImage from "../../assets/how-to-play/cards.png"
import hostJoinImage from "../../assets/how-to-play/host-join.png"
import hostPlaybackImage from "../../assets/how-to-play/host-playback.png"
import { tileImages } from "./ImagePreloader"

import Modal from "./Modal"
import styled from "./util/styled"

const Wrapper = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;

  @media screen and (min-width: 1000px) {
    bottom: auto;
    left: auto;
    top: 1rem;
    right: 1rem;
  }
`

const LinkButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colorMuted};
  transition: color 0.2s;

  &:hover {
    color: white;
  }

  @media screen and (min-width: 1000px) {
    font-size: 1.25rem;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;

  h2 {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 2rem;
  }

  img:not([class]) {
    display: block;
    margin: 0 auto 2rem auto;
    max-width: 100%;
  }
`

const CardTypeImage = styled.img`
  display: inline;
  width: 1rem;
  height: 1rem;
`

const HelpButtons: FunctionComponent = () => {
  const [aboutVisible, setAboutVisible] = useState(false)
  const [howToPlayVisible, setHowToPlayVisible] = useState(false)

  return (
    <Wrapper>
      <Modal
        isVisible={aboutVisible}
        close={() => setAboutVisible(false)}
        maxWidth="35rem"
        maxHeight="20rem"
      >
        <Content>
          <p>
            All Seeing Wizards is{" "}
            <a href="https://github.com/binary-koan/all-seeing-wizards">open source</a> and licensed
            under the GNU AGPL v3.
          </p>
          <p>
            Various assets such as card icons are from <a href="https://icons8.com">Icons8</a>.
          </p>
        </Content>
      </Modal>
      <LinkButton type="button" onClick={() => setAboutVisible(true)}>
        About
      </LinkButton>

      <Modal
        isVisible={howToPlayVisible}
        close={() => setHowToPlayVisible(false)}
        maxWidth="35rem"
        maxHeight="none"
      >
        <Content>
          <h2>Setting up</h2>
          <p>
            Start by hosting a game on a big screen. Note that "Max players" also determines the
            board size; it is possible to play with a smaller number of players on a large board,
            but tends to take longer and be less interesting.
          </p>
          <p>
            Once you start hosting, you will get a code for players to join. It works best if
            everyone joins on their phones.
          </p>
          <img src={hostJoinImage} />

          <h2>Playing cards</h2>
          <p>
            Once the game starts, turns are played until all but one player is defeated. During each
            turn, each player is dealt 7 cards and chooses 4 of them to play that turn. These might
            be attacks, movement cards, potions, shields, etc.
          </p>
          <p>As you play cards, a preview of what will happen is shown on your player screen.</p>
          <img src={cardsImage} style={{ maxHeight: "50vh" }} />
          <p>
            When everyone has picked their cards, the turn will be played out on the host screen.
            Each player's first picked card will activate first, and the effects of those cards will
            happen simultaneously (the first "action"). Then each player's second card will
            activate, and so on until all cards have activated.
          </p>
          <img src={hostPlaybackImage} style={{ maxHeight: "50vh" }} />

          <h2>Action order</h2>
          <p>
            The fact that different players' cards activate simultaneously might raise the question:
            What happens if players' cards clash with each other? What if one player attacks while
            another is moving out of the way?
          </p>
          <p>
            To solve this problem, different card types have different precedence. Within each
            action, cards will always activate in this order:
          </p>
          <p>
            <strong>Interrupt → Priority → Movement → Attacks</strong>
          </p>
          <p>
            <strong>Interrupt</strong> cards are ones which block other cards from having an effect.
            These have a <CardTypeImage src={cardPreventActions} /> symbol.
          </p>
          <p>
            <strong>Priority</strong> cards are any cards which only affect the caster. These have
            symbols such as <CardTypeImage src={cardHeal} />, <CardTypeImage src={cardShield} /> and{" "}
            <CardTypeImage src={cardPowerUp} />.
          </p>
          <p>
            <strong>Movement</strong> cards allow players to move around the map. These have a{" "}
            <CardTypeImage src={cardMove} /> symbol.
          </p>
          <p>
            <strong>Attack</strong> cards cause damage and can knock back other players. These have
            a <CardTypeImage src={cardAttack} /> symbol.
          </p>
          <p>
            In addition, if players attempt to move onto the same space in the same action, both
            moves are cancelled.
          </p>

          <h2>HP</h2>
          <p>
            HP is indicated by heart symbols. At the start of the game, all players have 5 HP. When
            a player takes damage, they lose HP, and when their HP reaches zero they are defeated.
          </p>
          <p>
            When a player is defeated, the area around them becomes "haunted". If any living player
            ends their turn in a haunted area, they lose 1 HP.
          </p>

          <h2>Terrain</h2>
          <p>
            On the game board there are a different types of terrain which affect players in
            different ways.
          </p>
          <p>
            <img src={tileImages.block[0]} style={{ maxWidth: "3rem" }} />
            <strong>Rocks</strong> cannot be moved through, but attacks will go through them.
          </p>
          <p>
            <img src={tileImages.water[0]} style={{ maxWidth: "3rem" }} />
            <strong>Water</strong> reduces a player's movement speed by 1 - "Move 1" cards will only
            turn the player and they must use a "Move 2" card to get out.
          </p>
          <p>
            <img src={tileImages.lava[0]} style={{ maxWidth: "3rem" }} />
            <strong>Lava</strong> damages a player for 1 HP if they end their turn in it.
          </p>
        </Content>
      </Modal>
      <LinkButton type="button" onClick={() => setHowToPlayVisible(true)}>
        How to Play
      </LinkButton>
    </Wrapper>
  )
}

export default HelpButtons
