import React from "react"
import { connect } from "react-redux"
import ViewState from "../../state/viewState"

interface HasPlayerProps {
  hasPlayer: boolean
}

export function playerOnly(Component: React.ComponentType<any>) {
  function mapStateToProps(state: ViewState): HasPlayerProps {
    return { hasPlayer: Boolean(state.player) }
  }

  const Wrapper: React.SFC<any> = props => {
    const { hasPlayer, ...ownProps } = props

    if (hasPlayer) {
      return <Component {...ownProps} />
    } else {
      return null
    }
  }

  return connect(mapStateToProps)(Wrapper)
}
