class Pack < ApplicationRecord
  has_many :boards
  has_many :cards
end
