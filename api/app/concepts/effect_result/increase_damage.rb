class EffectResult::IncreaseDamage < EffectResult::Base
  attr_reader :caster, :target, :amount

  def initialize(caster:, target:, amount:)
    @caster = caster
    @target = target
    @amount = amount
  end

  def apply!
    target.update!(hp: [target.hp + amount, Player::MAX_HP].min)
  end
end
