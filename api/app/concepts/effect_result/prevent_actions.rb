class EffectResult::PreventActions < EffectResult::Base
  attr_reader :caster, :target, :duration_type, :duration

  def initialize(caster:, target:, duration_type:, duration:)
    @caster = caster
    @target = target
    @duration_type = duration_type
    @duration = duration
  end

  def apply!
    target.modifiers.prevent_actions.create!(duration_type: duration_type, duration: duration)
  end
end
