class Player < ApplicationRecord
  include Connectable

  HAND_SIZE = 7
  MAX_HP = 5

  belongs_to :game
  belongs_to :character
  has_many :player_cards
  has_many :cards, through: :player_cards
  has_many :active_modifiers, -> { active }, class_name: "Modifier"

  validates :hp, presence: true, numericality: { less_than_or_equal_to: MAX_HP }

  def enough_cards_in_hand?
    player_cards.size >= HAND_SIZE
  end

  def add_to_hand!(card)
    player_cards.create!(card: card)
  end

  def enough_cards_played?
    player_cards.played.size >= hp
  end

  def position
    Position.new(x: x, y: y, facing: rotation)
  end

  def position=(new_position)
    self.x = new_position.x
    self.y = new_position.y
    self.rotation = new_position.facing
  end
end
