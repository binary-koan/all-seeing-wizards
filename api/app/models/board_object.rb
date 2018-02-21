class BoardObject < ApplicationRecord
  TYPE_ROCK = :rock

  belongs_to :board

  enum type_id: { TYPE_ROCK => 1 }
  validates :x, :y, numericality: { greater_than_or_equal_to: 0 }
end
