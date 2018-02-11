class EffectResult::MirrorShield < EffectResult::Base
  attr_reader :caster, :target, :duration_type, :duration

  def initialize(caster:, target:, duration_type:, duration:)
    @caster = caster
    @target = target
    @duration_type = duration_type
    @duration = duration
  end

  def apply!
    target.active_modifiers.mirror_shield.create!(duration_type: duration_type, duration: duration)
  end
end
