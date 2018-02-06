class EffectResult::ShieldDamage < EffectResult::Base
  attr_reader :caster

  def initialize(caster:)
    @caster = caster
  end
end
