require "rails_helper"

RSpec.describe Effect::MirrorShield do
  include ActiveRecordSpecSupport

  subject(:effect) { Effect::MirrorShield.new(card, player) }

  let(:game) { active_record_double(Game) }
  let(:card) { instance_double(Card, duration_type: duration_type, duration: duration) }
  let(:player) { instance_double(Player, game: game, active_modifiers: caster_modifiers) }

  let(:caster_modifiers) { [] }
  let(:duration) { 2 }
  let(:duration_type) { "action" }

  describe "#results" do
    context "in normal circumstances" do
      it "returns the effect" do
        expect(effect.results).to contain_exactly(instance_of(EffectResult::MirrorShield))
        expect(effect.results.first).to have_attributes(caster: player, target: player, duration_type: duration_type, duration: duration)
      end
    end

    context "when actions are prevented" do
      let(:caster_modifiers) { [Modifier.prevent_actions.new] }

      it "prevents all actions" do
        expect(effect.results).to be_all { |result| result.is_a?(EffectResult::None) }
      end
    end
  end
end
