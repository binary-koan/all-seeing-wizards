class Modifier < ApplicationRecord
  belongs_to :attached_to, polymorphic: true

  scope :active, -> { where("duration > 0") }

  MODIFIER_PREVENT_ACTIONS = "prevent_actions"
  MODIFIER_SHIELD = "shield"

  PRIORITY_MAPPING = {
    MODIFIER_PREVENT_ACTIONS => 1,
    MODIFIER_SHIELD => 2
  }

  enum modifier_type: {
    MODIFIER_PREVENT_ACTIONS => MODIFIER_PREVENT_ACTIONS,
    MODIFIER_SHIELD => MODIFIER_SHIELD
  }

  def priority
    PRIORITY_MAPPING[modifier_type]
  end

  def replacement_result(result)
    case modifier_type
    when MODIFIER_SHIELD then shield_replacement_result(result)
    when MODIFIER_PREVENT_ACTIONS then prevent_actions_replacement_result(result)
    end
  end

  private

  def shield_replacement_result(result)
    if result.is_a?(EffectResult::TakeDamage)
      EffectResult::ShieldDamage.new(player: result.player)
    end
  end

  def prevent_actions_replacement_result(result)
    EffectResult::None.new
  end
end
