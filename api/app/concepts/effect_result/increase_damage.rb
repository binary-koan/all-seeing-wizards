class EffectResult::IncreaseDamage < EffectResult::Base
  attr_reader :caster, :target, :amount

  def initialize(caster:, target:, amount:)
    @caster = caster
    @target = target
    @amount = amount
  end

  def apply!
    target.modifiers.increase_damage.create!(amount: amount, duration_type: "action", duration: 1)
  end
end
