require "rails_helper"

RSpec.describe Effect::Move do
  include ActiveRecordSpecSupport

  subject(:effect) { Effect::Move.new(card, player) }

  let(:game) do
    active_record_double(
      Game,
      active_modifiers: game_modifiers,
      tiles: instance_double(TileBoard, width: 10, height: 10)
    )
  end

  let(:card) { instance_double(Card, amount: amount) }
  let(:player) { instance_double(Player, game: game, position: position, active_modifiers: []) }

  let(:game_modifiers) { [] }
  let(:amount) { 2 }
  let(:position) { Position.new(x: 5, y: 5, facing: :north) }

  describe "#results" do
    context "in normal circumstances" do
      it "returns the effect" do
        expect(effect.results).to contain_exactly(instance_of(EffectResult::Move))
        expect(effect.results.first).to have_attributes(player: player, target: Position.new(x: 5, y: 3, facing: :north))
      end
    end

    context "when the resulting position would be out of the board" do
      let(:position) { Position.new(x: 5, y: 0, facing: :north) }

      it "clamps the position to the board" do
        expect(effect.results).to contain_exactly(instance_of(EffectResult::Move))
        expect(effect.results.first).to have_attributes(player: player, target: Position.new(x: 5, y: 0, facing: :north))
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
