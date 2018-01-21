class PlayerCard < ApplicationRecord
  belongs_to :card
  belongs_to :player
end
