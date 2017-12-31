class GameObject < ApplicationRecord
  belongs_to :game
  belongs_to :board_object

  validates :x, :y, numericality: { greater_than_or_equal_to: 0 }
end
