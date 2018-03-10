class EffectResult::ShieldDamage < EffectResult::Base
  def initialize(caster:, card:)
    super(caster: caster, target: caster, card: card)
  end
end
