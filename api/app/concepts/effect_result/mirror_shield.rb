class EffectResult::MirrorShield < EffectResult::Base
  attr_reader :duration_type, :duration

  def initialize(caster:, target:, duration_type:, duration:, card:)
    super(caster: caster, target: target, card: card)

    @duration_type = duration_type
    @duration = duration
  end

  def apply!
    target.active_modifiers.mirror_shield.create!(duration_type: duration_type, duration: duration, card: card)
  end

  def default_json
    super.merge(duration_type: duration_type, duration: duration)
  end
end
