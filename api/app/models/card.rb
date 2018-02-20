class Card < ApplicationRecord
  include HasDuration

  EFFECT_MOVE = :move
  EFFECT_ATTACK = :attack
  EFFECT_PREVENT_ACTIONS = :prevent_actions
  EFFECT_SHIELD = :shield
  EFFECT_MIRROR_SHIELD = :mirror_shield
  EFFECT_HEAL = :heal
  EFFECT_INCREASE_DAMAGE = :increase_damage

  EFFECT_MAPPINGS = {
    EFFECT_MOVE => Effect::Move,
    EFFECT_ATTACK => Effect::Attack,
    EFFECT_PREVENT_ACTIONS => Effect::PreventActions,
    EFFECT_SHIELD => Effect::Shield,
    EFFECT_MIRROR_SHIELD => Effect::MirrorShield,
    EFFECT_HEAL => Effect::Heal,
    EFFECT_INCREASE_DAMAGE => Effect::IncreaseDamage
  }.with_indifferent_access

  belongs_to :pack
  has_many :card_ranges
  has_many :player_cards

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

  def effect_on(player)
    @effect ||= EFFECT_MAPPINGS[effect_id].new(self, player)
  end
end
