require 'rails_helper'

RSpec.describe EffectResult::MirrorShield do
  subject(:effect) { EffectResult::MirrorShield.new(caster: nil, target: target, duration_type: duration_type, duration: duration) }

  let(:target) { Player.create!(game: Game.new, character: Character.new) }
  let(:duration_type) { HasDuration::DURATION_ACTION }
  let(:duration) { 2 }

  describe "#apply!" do
    it "adds a modifier to the player" do
      effect.apply!

      expect(target.active_modifiers.size).to eq 1
      expect(target.active_modifiers.first.modifier_type).to eq "mirror_shield"
      expect(target.active_modifiers.first.duration_type).to eq duration_type
      expect(target.active_modifiers.first.duration).to eq duration
    end
  end
end
