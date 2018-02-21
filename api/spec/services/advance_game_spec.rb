require "rails_helper"

RSpec.describe AdvanceGame do
  let(:players) do
    [
      instance_double(Player, enough_cards_played?: true),
      instance_double(Player, enough_cards_played?: true)
    ]
  end

  let(:game) { instance_double(Game, players: players) }

  subject(:advance_game) { AdvanceGame.new(game) }

  context "when a player still needs to play cards" do
    before do
      allow(players.first).to receive(:enough_cards_played?).and_return(false)
    end

    it "does not perform actions" do
      expect(PerformActions).not_to receive(:new)
      advance_game.call
    end
  end

  context "when all players have played cards" do
    let(:results) do
      [instance_double(EffectResult::Move, default_json: { type: "move" }), instance_double(EffectResult::Attack, default_json: { type: "attack" })]
    end

    it "performs actions and broadcasts the result" do
      expect(PerformActions).to be_called_with(game).and_return(results)
      expect { advance_game.call }.to broadcast_to(game).from_channel(GameChannel).with(event: "actions_performed", results: results.map(&:default_json))
    end
  end
end
