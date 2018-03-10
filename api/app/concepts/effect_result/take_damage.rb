class EffectResult::TakeDamage < EffectResult::Base
  attr_reader :damage

  def initialize(caster:, target:, damage:, card:)
    super(caster: caster, target: target, card: card)

    @damage = damage
  end

  def apply!
    target.update!(hp: [target.hp - damage, 0].max)
  end

  def default_json
    super.merge(damage: damage)
  end
end
