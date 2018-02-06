require "rails_helper"

RSpec.describe Effect::Heal do
  include ActiveRecordSpecSupport

  subject(:effect) { Effect::Heal.new(card, player) }

  let(:game) { active_record_double(Game, active_modifiers: game_modifiers) }
  let(:card) { instance_double(Card, amount: amount) }
  let(:player) { instance_double(Player, game: game, active_modifiers: []) }

  let(:game_modifiers) { [] }
  let(:amount) { 2 }

  describe "#results" do
    context "in normal circumstances" do
      it "returns the effect" do
        expect(effect.results).to contain_exactly(instance_of(EffectResult::Heal))
        expect(effect.results.first).to have_attributes(player: player, amount: amount)
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
