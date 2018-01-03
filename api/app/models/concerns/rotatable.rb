module Rotatable
  ROTATION_NONE = :none
  ROTATION_CLOCKWISE = :clockwise
  ROTATION_ANTICLOCKWISE = :anticlockwise
  ROTATION_REVERSE = :reverse

  ROTATION_MAPPINGS = {
    ROTATION_NONE => nil, #TODO something about this
    ROTATION_CLOCKWISE => nil,
    ROTATION_ANTICLOCKWISE => nil,
    ROTATION_REVERSE => nil
  }

  def self.included(model)
    model.validates :rotation, inclusion: { in: ROTATION_MAPPINGS.keys.map(&:to_s) }
  end
end
