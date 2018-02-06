class EffectResult::Move < EffectResult::Base
  attr_reader :caster, :target_position

  def initialize(caster:, target_position:)
    @caster = caster
    @target_position = target_position
  end

  def conflicts_with?(other)
    other.is_a?(EffectResult::Move) && target_position == other.target_position
  end
end
