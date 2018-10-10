import React from "react"

export default function bindProps<OwnProps, BoundProps>(
  Component: React.ComponentType<OwnProps & BoundProps>,
  boundProps: BoundProps
) {
  const BoundComponent: React.SFC<OwnProps> = ownProps => (
    <Component {...ownProps} {...boundProps} />
  )

  return BoundComponent
}
