require 'rails_helper'

RSpec.describe EffectResult::Heal do
  subject(:effect) { EffectResult::Heal.new(caster: nil, target: target, amount: amount) }

  let(:target) { Player.new(hp: hp, game: Game.new, character: Character.new) }
  let(:hp) { Player::MAX_HP }
  let(:amount) { 2 }

  describe "#apply!" do
    context "when healing an injured player" do
      let(:hp) { Player::MAX_HP - 3 }

      it "heals the player" do
        expect { effect.apply! }.to change { target.hp }.by(amount)
      end
    end

    context "when healing a max health player" do
      let(:hp) { Player::MAX_HP }

      it "does not heal the player" do
        expect { effect.apply! }.not_to change { target.hp }
      end
    end
  end

  describe "#default_json" do
    it "has the right keys" do
      expect(effect.default_json.keys).to contain_exactly(:caster_id, :target_id, :type, :amount)
    end
  end
end
