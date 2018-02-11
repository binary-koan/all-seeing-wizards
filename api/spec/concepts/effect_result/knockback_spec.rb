require 'rails_helper'

RSpec.describe EffectResult::Knockback do
  subject(:effect) { EffectResult::Knockback.new(caster: nil, target: target, target_position: target_position) }

  let(:target) { Player.create!(game: Game.new, character: Character.new, position: Position.new(x: 5, y: 5, facing: Position::NORTH)) }
  let(:target_position) { Position.new(x: 5, y: 1, facing: Position::SOUTH) }

  describe "#apply!" do
    it "sets the player's position" do
      effect.apply!

      expect(target.position).to eq(target_position)
    end
  end
end
