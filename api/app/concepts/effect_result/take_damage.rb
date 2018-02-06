class EffectResult::TakeDamage < EffectResult::Base
  attr_reader :caster, :target, :damage

  def initialize(caster:, target:, damage:)
    @caster = caster
    @target = target
    @damage = damage
  end
end
