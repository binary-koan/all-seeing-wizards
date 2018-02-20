require "rails_helper"

RSpec.describe Effect::Move do
  include ActiveRecordSpecSupport

  subject(:effect) { Effect::Move.new(card, player) }

  let(:game) { active_record_double(Game, tiles: instance_double(TileBoard, min_x: 0, max_x: 9, min_y: 0, max_y: 9)) }
  let(:card) { instance_double(Card, amount: amount, rotation: rotation) }
  let(:player) { instance_double(Player, game: game, position: position, active_modifiers: caster_modifiers) }

  let(:caster_modifiers) { [] }
  let(:amount) { 2 }
  let(:rotation) { Rotation::NONE }
  let(:position) { Position.new(x: 5, y: 5, facing: Rotation::NORTH) }

  describe "#results" do
    context "in normal circumstances" do
      it "returns the effect" do
        expect(effect.results).to contain_exactly(instance_of(EffectResult::Move))
        expect(effect.results.first).to have_attributes(target: player, target_position: Position.new(x: 5, y: 3, facing: Rotation::NORTH))
      end
    end

    context "when turning" do
      let(:rotation) { Rotation::ANTICLOCKWISE }
      let(:position) { Position.new(x: 5, y: 5, facing: Rotation::SOUTH) }

      it "returns the correct facing direction" do
        expect(effect.results.first.target_position.facing_direction).to eq(Rotation::EAST)
      end
    end

    context "when the resulting position would be out of the board" do
      let(:position) { Position.new(x: 5, y: 0, facing: Rotation::NORTH) }

      it "clamps the position to the board" do
        expect(effect.results).to contain_exactly(instance_of(EffectResult::Move))
        expect(effect.results.first).to have_attributes(target: player, target_position: Position.new(x: 5, y: 0, facing: Rotation::NORTH))
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
