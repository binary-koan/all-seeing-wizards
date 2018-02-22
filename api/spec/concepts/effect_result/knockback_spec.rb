require 'rails_helper'

RSpec.describe EffectResult::Knockback do
  subject(:effect) { EffectResult::Knockback.new(caster: nil, target: target, target_position: target_position) }

  let(:target) { Player.create!(game: Game.new, character: Character.new, position: Position.new(x: 5, y: 5, facing: Rotation::NORTH)) }
  let(:target_position) { Position.new(x: 5, y: 1, facing: Rotation::SOUTH) }

  describe "#apply!" do
    it "sets the player's position" do
      effect.apply!

      expect(target.position).to eq(target_position)
    end
  end

  describe "#conflicts_with?" do
    context "with another move to the same position" do
      let(:other) { EffectResult::Knockback.new(caster: nil, target: instance_double(Player), target_position: target_position) }

      it "conflicts" do
        expect(effect).to be_conflicts_with(other)
      end
    end

    context "with itself" do
      let(:other) { effect }

      it "does not conflict" do
        expect(effect).not_to be_conflicts_with(other)
      end
    end

    context "with a different effect with the same position" do
      let(:other) { EffectResult::Move.new(caster: nil, target: instance_double(Player), target_position: target_position) }

      it "does not conflict" do
        expect(effect).not_to be_conflicts_with(other)
      end
    end
  end

  describe "#default_json" do
    it "has the right keys" do
      expect(effect.default_json.keys).to contain_exactly(:caster_id, :target_id, :type, :target_position)
    end
  end
end
