require 'rails_helper'

RSpec.describe EffectResult::Move do
  subject(:effect) { EffectResult::Move.new(caster: nil, target: target, target_position: target_position) }

  let(:target) { Player.create!(game: Game.new, character: Character.new, position: Position.new(x: 5, y: 5, facing: Rotation::NORTH)) }
  let(:target_position) { Position.new(x: 5, y: 1, facing: Rotation::SOUTH) }

  describe "#apply!" do
    it "sets the player's position" do
      effect.apply!

      expect(target.position).to eq(target_position)
    end
  end
end