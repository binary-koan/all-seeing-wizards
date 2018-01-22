class Pack < ApplicationRecord
  has_many :boards
  has_many :cards
  has_many :characters
end
