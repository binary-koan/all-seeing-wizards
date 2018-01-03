class BoardObject < ApplicationRecord
  TYPE_ROCK = :rock

  TYPE_MAPPINGS = {
    TYPE_ROCK => nil #TODO class for the type
  }.with_indifferent_access

  belongs_to :board

  enum type_id: { TYPE_ROCK => 1 }
  validates :x, :y, numericality: { greater_than_or_equal_to: 0 }

  def type
    TYPE_MAPPINGS[type_id]
  end
end
