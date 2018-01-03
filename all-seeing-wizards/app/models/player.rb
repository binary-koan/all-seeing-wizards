class Player < ApplicationRecord
  CHARACTER_WIND_WORKER = :wind_worker

  CHARACTER_MAPPINGS = {
    CHARACTER_WIND_WORKER => { name: "Wily Wind Worker" } #TODO
  }.with_indifferent_access

  belongs_to :game

  enum character_id: { CHARACTER_WIND_WORKER => 0 }

  def character
    CHARACTER_MAPPINGS[character_id]
  end

  def as_json(*args)
    super(*args).merge(character: character)
  end
end
