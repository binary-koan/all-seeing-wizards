class GameBoard < ApplicationRecord
  BOARDS_HORIZONTALLY = 2
  BOARDS_VERTICALLY = 2

  include Rotatable

  belongs_to :game
  belongs_to :board
end
