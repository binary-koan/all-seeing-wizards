import React from "react"
import Loading from "./Loading"

import data from "../../packs/base/viewConfig"

export const tileImages = {
  block: require("../../assets/tiles/block.png"),
  ground: require("../../assets/tiles/ground.png"),
  lava: require("../../assets/tiles/lava.png"),
  water: require("../../assets/tiles/water.png")
}

export const effectImages = {
  attack: require("../../assets/effects/attack-basic.png"),
  heal: require("../../assets/effects/heal-basic.png"),
  powerUp: require("../../assets/effects/power-up-basic.png"),
  preventActions: require("../../assets/effects/prevent-actions-basic.png"),
  shield: require("../../assets/effects/shield-basic.png"),
  disconnected: require("../../assets/effects/disconnected.png"),
  knockedOut: require("../../assets/effects/knocked-out.png"),
  lavaFire: require("../../assets/effects/lava-fire.png"),
  waterSlow: require("../../assets/effects/water-slow.png"),
  move: require("../../assets/effects/movement-path.png")
}

export const cardIcons = {
  attack: require("../../assets/card-types/attack.png"),
  heal: require("../../assets/card-types/heal.png"),
  move: require("../../assets/card-types/move.png"),
  powerUp: require("../../assets/card-types/power-up.png"),
  preventActions: require("../../assets/card-types/prevent-actions.png"),
  shield: require("../../assets/card-types/shield.png")
}

interface ImagePreloaderProps {
  children: () => JSX.Element
}

interface ImagePreloaderState {
  isLoaded: boolean
}

// Note: Pixi has a global texture cache. When images are loaded by any Pixi loader they are
// put in the global cache and retrieved from it automatically whenever a Sprite is constructed.
// This means we don't need to care about actually using the resources returned by the loader
export class ImagePreloader extends React.Component<ImagePreloaderProps, ImagePreloaderState> {
  constructor(props: ImagePreloaderProps) {
    super(props)

    this.state = { isLoaded: false }
  }

  public componentWillMount() {
    const loader = new PIXI.loaders.Loader()
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

    imagesToLoad.forEach(image => loader.add(image))

    loader.load(() => {
      this.setState({ isLoaded: true })
    })
  }

  public render() {
    if (this.state.isLoaded) {
      return this.props.children()
    } else {
      return <Loading />
    }
  }
}
