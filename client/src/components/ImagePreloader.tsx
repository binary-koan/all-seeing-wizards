import { uniq } from "lodash"
import { Loader } from "pixi.js"
import React, { useEffect, useState } from "react"
import Loading from "./Loading"

import data from "../../packs/base/viewConfig"

import cardAttack from "../../assets/card-types/attack.png"
import cardHeal from "../../assets/card-types/heal.png"
import cardMove from "../../assets/card-types/move.png"
import cardPowerUp from "../../assets/card-types/power-up.png"
import cardPreventActions from "../../assets/card-types/prevent-actions.png"
import cardShield from "../../assets/card-types/shield.png"
import attackBasic from "../../assets/effects/attack-basic.png"
import disconnected from "../../assets/effects/disconnected.png"
import healBasic from "../../assets/effects/heal-basic.png"
import knockedOut from "../../assets/effects/knocked-out.png"
import lavaFire from "../../assets/effects/lava-fire.png"
import movementPath from "../../assets/effects/movement-path.png"
import powerUpBasic from "../../assets/effects/power-up-basic.png"
import preventActionsBasic from "../../assets/effects/prevent-actions-basic.png"
import shieldBasic from "../../assets/effects/shield-basic.png"
import waterSlow from "../../assets/effects/water-slow.png"
import ground0 from "../../assets/tiles/ground-0.png"
import ground1 from "../../assets/tiles/ground-1.png"
import ground2 from "../../assets/tiles/ground-2.png"
import ground3 from "../../assets/tiles/ground-3.png"
import lava0 from "../../assets/tiles/lava-0.png"
import lava1 from "../../assets/tiles/lava-1.png"
import rocks0 from "../../assets/tiles/rocks-0.png"
import rocks1 from "../../assets/tiles/rocks-1.png"
import water0 from "../../assets/tiles/water-0.png"
import water1 from "../../assets/tiles/water-1.png"

export const tileImages = {
  block: [rocks0, rocks1],
  ground: [ground0, ground1, ground2, ground3],
  lava: [lava0, lava1],
  water: [water0, water1]
}

export const effectImages = {
  attack: attackBasic,
  heal: healBasic,
  powerUp: powerUpBasic,
  preventActions: preventActionsBasic,
  shield: shieldBasic,
  disconnected: disconnected,
  knockedOut: knockedOut,
  lavaFire: lavaFire,
  waterSlow: waterSlow,
  move: movementPath
}

export const cardIcons = {
  attack: cardAttack,
  heal: cardHeal,
  move: cardMove,
  powerUp: cardPowerUp,
  preventActions: cardPreventActions,
  shield: cardShield
}

interface ImagePreloaderProps {
  children: () => JSX.Element
}

// Note: Pixi has a global texture cache. When images are loaded by any Pixi loader they are
// put in the global cache and retrieved from it automatically whenever a Sprite is constructed.
// This means we don't need to care about actually using the resources returned by the loader
export const ImagePreloader: React.FC<ImagePreloaderProps> = ({ children }) => {
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    const loader = new Loader()
    const imagesToLoad = Object.values(data.characters)
      .map(character => [character.heartImage].concat(Object.values(character.images)))
      .concat(
        Object.values(data.cards).map(card =>
          [card.image].concat(card.preloadImages ? card.preloadImages : [])
        )
      )
      .concat(Object.values(tileImages))
      .concat(Object.values(effectImages))
      .concat(Object.values(cardIcons))
      .reduce((list, current) => list.concat(current), [])

    uniq(imagesToLoad).forEach(image => loader.add(image))

    loader.load(() => setLoaded(true))
  }, [])

  if (isLoaded) {
    return children()
  } else {
    return <Loading />
  }
}
