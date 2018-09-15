import React = require("react")
import ActionButton from "../base/ActionButton"
import InputText from "../base/InputText"

export default function() {
  return (
    <div>
      <InputText label="Game Code" placeholder="e.g. ABCD" />
      <ActionButton type="primary">Join Now</ActionButton>
    </div>
  )
}
