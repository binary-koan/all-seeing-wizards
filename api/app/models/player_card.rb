class PlayerCard < ApplicationRecord
  belongs_to :card
  belongs_to :player

  scope :played, -> { where.not(played_index: nil) }

  def effect
    @effect ||= CardEffect.new(self).call
  end
end
