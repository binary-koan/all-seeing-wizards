class EffectResult::Heal < EffectResult::Base
  attr_reader :amount

  def initialize(caster:, target:, amount:)
    super(caster: caster, target: target)

    @amount = amount
  end

  def apply!
    target.update!(hp: [target.hp + amount, Player::MAX_HP].min)
  end

  def default_json
    super.merge(amount: amount)
  end
end
