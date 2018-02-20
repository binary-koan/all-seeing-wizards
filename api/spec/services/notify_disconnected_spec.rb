require "rails_helper"

RSpec.describe NotifyDisconnected do
  include PackSpecSupport

  subject(:service) { NotifyDisconnected.new(player) }

  let(:player) { Player.create!(game: game, character: add_character!(create_empty_pack!)) }
  let(:game) { Game.create! }

  it "disconnects the player and broadcasts success" do
    expect(player).to receive(:as_json).and_return(id: 1)
    expect { service.call }.to broadcast_to(game).from_channel(GameChannel).with(event: "player_updated", player: { id: 1 })
    expect(player).to be_disconnected
  end
end
