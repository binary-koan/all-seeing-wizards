require 'rails_helper'

RSpec.describe EffectResult::Attack do
  subject(:effect) { EffectResult::Attack.new(caster: nil, tiles: []) }

  describe "#default_json" do
    it "has the right keys" do
      expect(effect.default_json.keys).to contain_exactly(:caster_id, :target_id, :type, :tile_ids)
    end
  end
end
