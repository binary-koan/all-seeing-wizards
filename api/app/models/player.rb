class Player < ApplicationRecord
  include Connectable

  HAND_SIZE = 7

  CHARACTER_WIND_WORKER = :wind_worker

  CHARACTER_MAPPINGS = {
    CHARACTER_WIND_WORKER => { name: "Wily Wind Worker" } #TODO
  }.with_indifferent_access

  belongs_to :game
  has_many :player_cards
  has_many :cards, through: :player_cards

  enum character_id: { CHARACTER_WIND_WORKER => 0 }

  def character
    CHARACTER_MAPPINGS[character_id]
  end

  def enough_cards_in_hand?
    player_cards.size >= HAND_SIZE
  end

  def add_to_hand!(card)
    player_cards.create!(card: card)
  end
end
