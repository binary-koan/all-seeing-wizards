require "rails_helper"

RSpec.describe NotifyConnected do
  include PackSpecSupport

  subject(:service) { NotifyConnected.new(player) }

  let(:player) { Player.create!(game: game, character: add_character!(create_empty_pack!)) }
  let(:game) { Game.create! }

  it "connects the player and broadcasts success" do
    expect(player).to receive(:default_json).and_return(id: 1)
    expect { service.call }.to broadcast_to(game).from_channel(GameChannel).with(event: "player_updated", player: { id: 1 })
    expect(player).to be_connected
  end
end
