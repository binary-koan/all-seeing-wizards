class Game < ApplicationRecord
  has_many :game_packs
  has_many :packs, through: :game_packs

  has_many :game_boards
  has_many :game_objects
end
