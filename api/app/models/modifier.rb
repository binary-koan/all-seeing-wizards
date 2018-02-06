class Modifier < ApplicationRecord
  belongs_to :player

  scope :active, -> { where("duration > 0") }

  MODIFIER_PREVENT_ACTIONS = "prevent_actions"
  MODIFIER_SHIELD = "shield"
  MODIFIER_INCREASE_DAMAGE = "increase_damage"

  PRIORITY_MAPPING = {
    MODIFIER_PREVENT_ACTIONS => 1,
    MODIFIER_SHIELD => 2,
    MODIFIER_INCREASE_DAMAGE => 3
  }

  enum modifier_type: {
    MODIFIER_PREVENT_ACTIONS => MODIFIER_PREVENT_ACTIONS,
    MODIFIER_SHIELD => MODIFIER_SHIELD,
    MODIFIER_INCREASE_DAMAGE => MODIFIER_INCREASE_DAMAGE
  }

  def priority
    PRIORITY_MAPPING[modifier_type]
  end

  def replace_result_as_caster(result)
    case modifier_type
    when MODIFIER_INCREASE_DAMAGE then increase_damage(result)
    when MODIFIER_PREVENT_ACTIONS then prevent_actions(result)
    end
  end

  def replace_result_as_target(result)
    case modifier_type
    when MODIFIER_SHIELD then shield_from_attack(result)
    end
  end

  private

  def shield_from_attack(result)
    if result.is_a?(EffectResult::TakeDamage) || result.is_a?(EffectResult::PreventActions)
      EffectResult::ShieldDamage.new(caster: result.target)
    elsif result.is_a?(EffectResult::Knockback)
      EffectResult::None.new
    end
  end

  def prevent_actions(result)
    EffectResult::None.new
  end

  def increase_damage(result)
    if result.is_a?(EffectResult::TakeDamage)
      result.damage += amount
    end
  end
end
