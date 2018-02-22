require 'rails_helper'

RSpec.describe Card, type: :model do
  let(:card) do
    Card.move.new(
      name: "Test",
      amount: 1,
      rotation: Rotation::NONE
    )
  end

  describe "#default_json" do
    it "describes the card as JSON" do
      expect(card.default_json.keys).to contain_exactly(:id, :name, :tagline, :effect_id, :amount, :rotation, :damage, :knockback, :duration_type, :duration)
    end
  end
end
