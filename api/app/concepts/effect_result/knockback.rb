class EffectResult::Knockback < EffectResult::Base
  attr_reader :caster, :target, :target_position

  def initialize(caster:, target:, target_position:)
    @caster = caster
    @target = target
    @target_position = target_position
  end

  def conflicts_with?(other)
    other != self && other.is_a?(EffectResult::Knockback) && target_position == other.target_position
  end

  def apply!
    target.update!(position: target_position)
  end
end
