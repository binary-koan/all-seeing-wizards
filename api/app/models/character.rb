class Character < ApplicationRecord
  belongs_to :pack
  has_many :players

  CHARACTER_TYPE_MAPPINGS = {
    no_powers: nil,
    wind_worker: nil, #TODO
    paladin: nil,
    dark_lord: nil,
    alchemist: nil,
    midas: nil
  }.with_indifferent_access

  enum character_type: CHARACTER_TYPE_MAPPINGS.keys.map { |key| [key, key] }.to_h

  def default_json
    {
      name: name,
      character_type: character_type
    }
  end
end
