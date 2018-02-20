require "rails_helper"

RSpec.describe Effect::Base do
  describe "#sort_order" do
    let(:effect_results) do
      [
        Effect::Attack.new(instance_double(Card), instance_double(Player)),
        Effect::Heal.new(instance_double(Card), instance_double(Player)),
        Effect::IncreaseDamage.new(instance_double(Card), instance_double(Player)),
        Effect::Move.new(instance_double(Card), instance_double(Player)),
        Effect::MirrorShield.new(instance_double(Card), instance_double(Player)),
        Effect::PreventActions.new(instance_double(Card), instance_double(Player)),
        Effect::Shield.new(instance_double(Card), instance_double(Player))
      ]
    end

    it "sorts the effects in the right order" do
      expect(effect_results.sort_by(&:sort_order).map(&:class)).to eq [
        Effect::PreventActions,
        Effect::Heal,
        Effect::IncreaseDamage,
        Effect::MirrorShield,
        Effect::Shield,
        Effect::Move,
        Effect::Attack
      ]
    end
  end
end
