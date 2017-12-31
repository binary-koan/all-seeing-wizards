class CardRange < ApplicationRecord
  TYPE_AREA = :area
  TYPE_LINE = :line
  TYPE_POINT = :point
  TYPE_ALL = :all

  TYPE_MAPPINGS = {
    TYPE_AREA => nil, #TODO classes
    TYPE_LINE => nil,
    TYPE_POINT => nil,
    TYPE_ALL => nil
  }

  belongs_to :card

  enum type_id: { TYPE_AREA => 0, TYPE_LINE => 1, TYPE_POINT => 2, TYPE_ALL => 3 }
  validates :size, numericality: { greater_than_or_equal_to: 0 }

  def type
    TYPE_MAPPINGS[type_id]
  end
end
