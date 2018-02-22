class PlayerCard < ApplicationRecord
  belongs_to :card
  belongs_to :player

  scope :played, -> { where.not(played_index: nil) }

  def effect
    @effect ||= card.effect_on(player)
  end

  def full_json
    {
      id: id,
      played_index: played_index,
      card: card.default_json
    }
  end
end
