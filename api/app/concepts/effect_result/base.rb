class EffectResult::Base
  attr_reader :target, :caster, :card

  def initialize(target:, caster:, card:)
    @target = target
    @caster = caster
    @card = card
  end

  def conflicts_with?(other)
    false
  end

  def apply!
  end

  def default_json
    { type: self.class.to_s.demodulize.underscore, target_id: target&.id, caster_id: caster&.id, card_name: card&.name }
  end
end
