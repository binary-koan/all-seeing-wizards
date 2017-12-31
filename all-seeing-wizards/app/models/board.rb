class Board < ApplicationRecord
  SIZE = 5

  belongs_to :pack
  has_many :board_tiles
  has_many :board_objects

  has_many :game_boards
  has_many :games, through: :game_boards
end
