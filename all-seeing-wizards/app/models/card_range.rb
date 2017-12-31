class CardRange < ApplicationRecord
  TYPE_AREA = :area
  TYPE_LINE = :line
  TYPE_POINT = :point
  TYPE_WHOLE_MAP = :whole_map

  TYPE_MAPPINGS = {
    TYPE_AREA => nil, #TODO classes
    TYPE_LINE => nil,
    TYPE_POINT => nil,
    TYPE_WHOLE_MAP => nil
  }

  belongs_to :card

  enum type_id: { TYPE_AREA => 0, TYPE_LINE => 1, TYPE_POINT => 2, TYPE_WHOLE_MAP => 3 }
  validates :size, numericality: { greater_than_or_equal_to: 0, allow_nil: true }

  def type
    TYPE_MAPPINGS[type_id]
  end
end
