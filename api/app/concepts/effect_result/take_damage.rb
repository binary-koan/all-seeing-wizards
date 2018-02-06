class EffectResult::TakeDamage < EffectResult::Base
  attr_reader :caster, :target, :damage

  def initialize(caster:, target:, damage:)
    @caster = caster
    @target = target
    @damage = damage
  end

  def apply!
    target.update!(hp: [target.hp - amount, 0].min)
  end
end
