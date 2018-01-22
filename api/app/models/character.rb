class Character < ApplicationRecord
  belongs_to :pack
  has_many :players

  CHARACTER_TYPE_MAPPINGS = {
    wind_worker: nil, #TODO
    paladin: nil,
    dark_lord: nil,
    alchemist: nil,
    midas: nil
  }.with_indifferent_access
end
