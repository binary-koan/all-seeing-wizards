import React, { FunctionComponent } from "react"

export default function bindProps<OwnProps, BoundProps>(
  Component: React.ComponentType<OwnProps & BoundProps>,
  boundProps: BoundProps
) {
  const BoundComponent: FunctionComponent<OwnProps> = ownProps => (
    <Component {...ownProps} {...boundProps} />
  )

  return BoundComponent
}
