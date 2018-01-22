class Player < ApplicationRecord
  include Connectable

  HAND_SIZE = 7

  belongs_to :game
  belongs_to :character
  has_many :player_cards
  has_many :cards, through: :player_cards

  def enough_cards_in_hand?
    player_cards.size >= HAND_SIZE
  end

  def add_to_hand!(card)
    player_cards.create!(card: card)
  end
end
