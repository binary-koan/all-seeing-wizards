class EffectResult::ShieldDamage < EffectResult::Base
  def initialize(caster:)
    super(caster: caster, target: caster)
  end
end
