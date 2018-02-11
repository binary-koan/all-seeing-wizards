require 'rails_helper'

RSpec.describe EffectResult::IncreaseDamage do
  subject(:effect) { EffectResult::IncreaseDamage.new(caster: nil, target: target, amount: amount) }

  let(:target) { Player.create!(game: Game.new, character: Character.new) }
  let(:amount) { 2 }

  describe "#apply!" do
    it "adds a modifier to the player" do
      effect.apply!

      expect(target.active_modifiers.size).to eq 1
      expect(target.active_modifiers.first.modifier_type).to eq "increase_damage"
      expect(target.active_modifiers.first.amount).to eq amount
    end
  end
end
