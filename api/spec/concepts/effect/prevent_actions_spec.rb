require "rails_helper"

RSpec.describe Effect::PreventActions do
  include ActiveRecordSpecSupport

  subject(:effect) { Effect::PreventActions.new(card, player) }

  let(:game) { active_record_double(Game, active_modifiers: game_modifiers) }
  let(:card) { instance_double(Card, duration: duration, duration_type: duration_type) }
  let(:player) { instance_double(Player, game: game) }

  let(:area_of_effect) { instance_double(AreaOfEffect, affected_tiles: [instance_double(PositionedTile)], affected_players: []) }
  let(:game_modifiers) { [] }
  let(:duration) { 2 }
  let(:duration_type) { "action" }

  before do
    expect(effect).to receive(:area_of_effect).at_least(:once).and_return(area_of_effect)
  end

  describe "#results" do
    context "with no affected players" do
      before do
        expect(area_of_effect).to receive(:affected_players).at_least(:once).and_return([])
      end

      it "still returns the prevention effect" do
        expect(effect.results).to contain_exactly(instance_of(EffectResult::AttemptPreventActions))
        expect(effect.results.first).to have_attributes(tiles: area_of_effect.affected_tiles)
      end
    end

    context "with one affected player" do
      let(:affected_player) { instance_double(Player, active_modifiers: []) }

      before do
        expect(area_of_effect).to receive(:affected_players).at_least(:once).and_return([affected_player])
      end

      it "prevents actions for the player" do
        expect(effect.results).to contain_exactly(instance_of(EffectResult::AttemptPreventActions), instance_of(EffectResult::PreventActions))
        expect(effect.results.last).to have_attributes(player: affected_player, duration_type: duration_type, duration: duration)
      end
    end

    context "when the caster would be affected" do
      before do
        expect(area_of_effect).to receive(:affected_players).at_least(:once).and_return([player])
      end

      it "does not affect the caster" do
        expect(effect.results).not_to include(instance_of(EffectResult::PreventActions))
      end
    end

    context "with multiple affected players" do
      let(:affected_players) { [instance_double(Player, active_modifiers: []), instance_double(Player, active_modifiers: [])] }

      before do
        expect(area_of_effect).to receive(:affected_players).at_least(:once).and_return(affected_players)
      end

      it "damages the players" do
        affected_players.each do |player|
          expect(effect.results).to include { |result| result.is_a?(EffectResult::PreventActions) && result.player == player }
        end
      end
    end

    context "when a player is shielded" do
      let(:affected_player) { instance_double(Player, active_modifiers: [Modifier.shield.new]) }

      before do
        expect(area_of_effect).to receive(:affected_players).at_least(:once).and_return([affected_player])
      end

      it "does not affect that player" do
        expect(effect.results).not_to include(instance_of(EffectResult::PreventActions))
        expect(effect.results).to include(instance_of(EffectResult::ShieldDamage))
      end
    end

    context "when actions are already prevented" do
      let(:game_modifiers) { [Modifier.prevent_actions.new] }

      it "prevents all actions" do
        expect(effect.results).to be_all { |result| result.is_a?(EffectResult::None) }
      end

      context "when a player is shielded" do
        let(:affected_player) { instance_double(Player, active_modifiers: [Modifier.shield.new]) }

        before do
          expect(area_of_effect).to receive(:affected_players).at_least(:once).and_return([affected_player])
        end

        it "still prevents actions" do
          expect(effect.results).to be_all { |result| result.is_a?(EffectResult::None) }
        end
      end
    end
  end
end
