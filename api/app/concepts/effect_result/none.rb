class EffectResult::None < EffectResult::Base
  def initialize(card:)
    super(target: nil, caster: nil, card: card)
  end
end
