require 'rails_helper'

RSpec.describe EffectResult::TakeDamage do
  subject(:effect) { EffectResult::TakeDamage.new(caster: nil, target: target, damage: damage) }

  let(:target) { Player.new(hp: hp, game: Game.new, character: Character.new) }
  let(:damage) { 2 }

  describe "#apply!" do
    context "when the player's hp is not zero" do
      let(:hp) { Player::MAX_HP }

      it "damages the player" do
        expect { effect.apply! }.to change { target.hp }.by(-damage)
      end
    end

    context "when the player's hp is zero" do
      let(:hp) { 0 }

      it "does not damage the player" do
        expect { effect.apply! }.not_to change { target.hp }
      end
    end
  end
end
