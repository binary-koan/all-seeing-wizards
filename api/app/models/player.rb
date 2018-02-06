class Player < ApplicationRecord
  include Connectable

  HAND_SIZE = 7
  HP = 5

  belongs_to :game
  belongs_to :character
  has_many :player_cards
  has_many :cards, through: :player_cards
  has_many :active_modifiers, -> { active }, class_name: "Modifier", as: :attached_to

  def enough_cards_in_hand?
    player_cards.size >= HAND_SIZE
  end

  def add_to_hand!(card)
    player_cards.create!(card: card)
  end

  def enough_cards_played?
    player_cards.played.size >= HP
  end

  def position
    @position ||= Position.new(x: x, y: y, rotation: rotation)
  end
end
