class Game < ApplicationRecord
  has_many :game_packs
  has_many :packs, through: :game_packs
  has_many :cards, through: :packs
  has_many :characters, through: :packs

  has_many :game_boards
  has_many :game_objects

  has_one :host
  has_many :players
  has_many :player_cards, through: :players

  def started?
    started_at.present?
  end
  alias_method :started, :started?

  def tiles
    @tiles ||= CalculateGameTiles.new(self).call
  end

  def available_cards
    cards.where.not(id: player_cards.pluck(:card_id))
  end

  def available_characters
    characters.where.not(id: players.pluck(:character_id))
  end
end
