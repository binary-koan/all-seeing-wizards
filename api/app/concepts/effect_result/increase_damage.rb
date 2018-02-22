class EffectResult::IncreaseDamage < EffectResult::Base
  attr_reader :amount, :duration_type, :duration

  def initialize(caster:, target:, amount:, duration_type:, duration:)
    super(caster: caster, target: target)

    @amount = amount
    @duration_type = duration_type
    @duration = duration
  end

  def apply!
    target.active_modifiers.increase_damage.create!(amount: amount, duration_type: duration_type, duration: duration)
  end

  def default_json
    super.merge(amount: amount, duration_type: duration_type, duration: duration)
  end
end
