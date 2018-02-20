require "rails_helper"

RSpec.describe Effect::IncreaseDamage do
  include ActiveRecordSpecSupport

  subject(:effect) { Effect::IncreaseDamage.new(card, player) }

  let(:game) { active_record_double(Game) }
  let(:card) { instance_double(Card, amount: amount, duration_type: Card::DURATION_ACTION, duration: 2) }
  let(:player) { instance_double(Player, game: game, active_modifiers: caster_modifiers) }

  let(:caster_modifiers) { [] }
  let(:amount) { 2 }

  describe "#results" do
    context "in normal circumstances" do
      it "returns the effect" do
        expect(effect.results).to contain_exactly(instance_of(EffectResult::IncreaseDamage))
        expect(effect.results.first).to have_attributes(caster: player, target: player, amount: amount)
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
