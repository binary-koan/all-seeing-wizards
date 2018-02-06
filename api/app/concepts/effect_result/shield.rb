class EffectResult::Shield < EffectResult::Base
  attr_reader :caster, :target, :duration_type, :duration

  def initialize(caster:, target:, duration_type:, duration:)
    @caster = caster
    @target = target
    @duration_type = duration_type
    @duration = duration
  end
end
