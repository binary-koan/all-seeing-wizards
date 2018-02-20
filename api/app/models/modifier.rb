class Modifier < ApplicationRecord
  include HasDuration

  belongs_to :player

  scope :active, -> { where("duration > 0") }

  MODIFIER_PREVENT_ACTIONS = "prevent_actions"
  MODIFIER_SHIELD = "shield"
  MODIFIER_MIRROR_SHIELD = "mirror_shield"
  MODIFIER_INCREASE_DAMAGE = "increase_damage"

  PRIORITY_MAPPING = {
    MODIFIER_PREVENT_ACTIONS => 1,
    MODIFIER_SHIELD => 2,
    MODIFIER_MIRROR_SHIELD => 3,
    MODIFIER_INCREASE_DAMAGE => 4
  }

  enum modifier_type: {
    MODIFIER_PREVENT_ACTIONS => MODIFIER_PREVENT_ACTIONS,
    MODIFIER_SHIELD => MODIFIER_SHIELD,
    MODIFIER_MIRROR_SHIELD => MODIFIER_MIRROR_SHIELD,
    MODIFIER_INCREASE_DAMAGE => MODIFIER_INCREASE_DAMAGE
  }

  validates_inclusion_of :duration_type, in: DURATION_TYPES

  def priority
    PRIORITY_MAPPING[modifier_type]
  end

  def replace_result_as_caster(result)
    case modifier_type
    when MODIFIER_INCREASE_DAMAGE then increase_damage(result)
    when MODIFIER_PREVENT_ACTIONS then prevent_actions(result)
    else result
    end
  end

  def replace_result_as_target(result)
    case modifier_type
    when MODIFIER_SHIELD then shield_from_attack(result)
    when MODIFIER_MIRROR_SHIELD then reverse_damage(result)
    when MODIFIER_PREVENT_ACTIONS then prevent_actions(result)
    else result
    end
  end

  def next_action!
    return if duration_type == DURATION_TURN || duration <= 0

    update!(duration: duration - 1)
  end

  def next_turn!
    return if duration_type == DURATION_ACTION || duration <= 0

    update!(duration: duration - 1)
  end

  private

  def shield_from_attack(result)
    if result.is_a?(EffectResult::TakeDamage) || result.is_a?(EffectResult::PreventActions)
      EffectResult::ShieldDamage.new(caster: result.target)
    elsif result.is_a?(EffectResult::Knockback)
      EffectResult::None.new
    else
      result
    end
  end

  def reverse_damage(result)
    if result.is_a?(EffectResult::TakeDamage)
      EffectResult::TakeDamage.new(caster: result.target, target: result.caster, damage: result.damage)
    elsif result.is_a?(EffectResult::PreventActions)
      EffectResult::PreventActions.new(caster: result.target, target: result.caster, duration_type: result.duration_type, duration: result.duration)
    elsif result.is_a?(EffectResult::Knockback)
      EffectResult::None.new
    else
      result
    end
  end

  def prevent_actions(result)
    EffectResult::None.new
  end

  def increase_damage(result)
    if result.is_a?(EffectResult::TakeDamage)
      EffectResult::TakeDamage.new(caster: result.caster, target: result.target, damage: result.damage + amount)
    else
      result
    end
  end
end
