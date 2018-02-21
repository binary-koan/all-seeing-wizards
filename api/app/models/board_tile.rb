class BoardTile < ApplicationRecord
  TYPE_GROUND = :ground
  TYPE_BLOCK = :block
  TYPE_WATER = :water
  TYPE_LAVA = :lava

  belongs_to :board

  enum type_id: { TYPE_GROUND => 0, TYPE_BLOCK => 1, TYPE_WATER => 2, TYPE_LAVA => 3 }
  validates :index, numericality: { greater_than_or_equal_to: 0 }
end
