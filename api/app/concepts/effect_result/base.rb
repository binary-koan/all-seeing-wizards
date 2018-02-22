class EffectResult::Base
  attr_reader :target, :caster

  def initialize(target:, caster:)
    @target = target
    @caster = caster
  end

  def conflicts_with?(other)
    false
  end

  def apply!
  end

  def default_json
    { type: self.class.to_s.demodulize.underscore, target_id: target&.id, caster_id: caster&.id }
  end
end
