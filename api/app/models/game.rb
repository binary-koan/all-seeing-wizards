class Game < ApplicationRecord
  has_many :game_packs
  has_many :packs, through: :game_packs

  has_many :game_boards
  has_many :game_objects

  has_one :host
  has_many :players

  def started?
    started_at.present?
  end
  alias_method :started, :started?

  def tiles
    CalculateGameTiles.new(self).call
  end
end
