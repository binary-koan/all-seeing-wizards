class Card < ApplicationRecord
  EFFECT_MOVE = :move
  EFFECT_ATTACK = :attack
  EFFECT_PREVENT_ACTIONS = :prevent_actions
  EFFECT_SHIELD = :shield
  EFFECT_MIRROR_SHIELD = :mirror_shield
  EFFECT_HEAL = :heal
  EFFECT_INCREASE_DAMAGE = :increase_damage

  EFFECT_MAPPINGS = {
    EFFECT_MOVE => nil,
    EFFECT_ATTACK => nil,
    EFFECT_PREVENT_ACTIONS => nil,
    EFFECT_SHIELD => nil,
    EFFECT_MIRROR_SHIELD => nil,
    EFFECT_HEAL => nil,
    EFFECT_INCREASE_DAMAGE => nil
  }.with_indifferent_access

  belongs_to :pack
  has_many :card_ranges

  enum effect_id: {
    EFFECT_MOVE => 0,
    EFFECT_ATTACK => 1,
    EFFECT_PREVENT_ACTIONS => 2,
    EFFECT_SHIELD => 3,
    EFFECT_MIRROR_SHIELD => 4,
    EFFECT_HEAL => 5,
    EFFECT_INCREASE_DAMAGE => 6
  }
  validates :name, presence: true

  def effect
    EFFECT_MAPPINGS[effect_id]
  end
end
