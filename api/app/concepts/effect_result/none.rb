class EffectResult::None < EffectResult::Base
  def initialize
    super(target: nil, caster: nil)
  end
end
