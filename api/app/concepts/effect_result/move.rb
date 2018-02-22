class EffectResult::Move < EffectResult::Base
  attr_reader :target_position

  def initialize(caster:, target:, target_position:)
    super(caster: caster, target: target)

    @target_position = target_position
  end

  def conflicts_with?(other)
    other != self && other.is_a?(EffectResult::Move) && target_position == other.target_position
  end

  def apply!
    target.update!(position: target_position)
  end

  def default_json
    super.merge(target_position: target_position.default_json)
  end
end
