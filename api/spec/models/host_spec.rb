require 'rails_helper'

RSpec.describe Host, type: :model do
  let(:host) { Host.new(game: Game.new) }

  describe "#host?" do
    it "is true" do
      expect(host).to be_host
    end
  end

  describe "#player?" do
    it "is false" do
      expect(host).not_to be_player
    end
  end
end
