class GameBoard < ApplicationRecord
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

  belongs_to :game
  belongs_to :board

  validates :rotation, inclusion: { in: ROTATION_MAPPINGS.keys }
end
