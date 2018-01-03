class BoardTile < ApplicationRecord
  TYPE_GROUND = :ground
  TYPE_BLOCK = :block
  TYPE_WATER = :water
  TYPE_LAVA = :lava

  TYPE_MAPPINGS = {
    TYPE_GROUND => nil, #TODO classes
    TYPE_BLOCK => nil,
    TYPE_WATER => nil,
    TYPE_LAVA => nil
  }.with_indifferent_access

  belongs_to :board

  enum type_id: { TYPE_GROUND => 0, TYPE_BLOCK => 1, TYPE_WATER => 2, TYPE_LAVA => 3 }
  validates :index, numericality: { greater_than_or_equal_to: 0 }

  def type
    TYPE_MAPPINGS[type_id]
  end
end
