require "rails_helper"

RSpec.describe Effect::Shield do
  include ActiveRecordSpecSupport

  subject(:effect) { Effect::Shield.new(card, player) }

  let(:game) { active_record_double(Game, active_modifiers: game_modifiers) }
  let(:card) { instance_double(Card, duration_type: duration_type, duration: duration) }
  let(:player) { instance_double(Player, game: game, active_modifiers: []) }

  let(:game_modifiers) { [] }
  let(:duration) { 2 }
  let(:duration_type) { "action" }

  describe "#results" do
    context "in normal circumstances" do
      it "returns the effect" do
        expect(effect.results).to contain_exactly(instance_of(EffectResult::Shield))
        expect(effect.results.first).to have_attributes(player: player, duration_type: duration_type, duration: duration)
      end
    end

    context "when actions are prevented" do
      let(:game_modifiers) { [Modifier.prevent_actions.new] }

      it "prevents all actions" do
        expect(effect.results).to be_all { |result| result.is_a?(EffectResult::None) }
      end
    end
  end
end
