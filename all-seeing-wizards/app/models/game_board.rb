class GameBoard < ApplicationRecord
  include Rotatable

  belongs_to :game
  belongs_to :board
end
