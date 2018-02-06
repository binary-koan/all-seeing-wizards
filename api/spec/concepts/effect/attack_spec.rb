require "rails_helper"

RSpec.describe Effect::Attack do
  include ActiveRecordSpecSupport

  subject(:effect) { Effect::Attack.new(card, player) }

  let(:game) { active_record_double(Game, active_modifiers: []) }
  let(:card) { instance_double(Card, damage: damage) }
  let(:player) { instance_double(Player, game: game) }
  let(:area_of_effect) { instance_double(AreaOfEffect, affected_tiles: [instance_double(PositionedTile)]) }

  let(:damage) { 2 }

  before do
    expect(effect).to receive(:area_of_effect).at_least(:once).and_return(area_of_effect)
  end

  describe "#results" do
    context "with no affected players" do
      before do
        expect(area_of_effect).to receive(:affected_players).at_least(:once).and_return([])
      end

      it "still returns the attack effect" do
        expect(effect.results).to contain_exactly(instance_of(EffectResult::Attack))
        expect(effect.results.first).to have_attributes(tiles: area_of_effect.affected_tiles)
      end
    end

    context "with one affected player" do
      let(:affected_player) { instance_double(Player, active_modifiers: []) }

      before do
        expect(area_of_effect).to receive(:affected_players).at_least(:once).and_return([affected_player])
      end

      it "damages the player" do
        expect(effect.results).to contain_exactly(instance_of(EffectResult::Attack), instance_of(EffectResult::TakeDamage))
        expect(effect.results.last).to have_attributes(player: affected_player, damage: damage)
      end
    end

    context "when the caster would be affected" do
      before do
        expect(area_of_effect).to receive(:affected_players).at_least(:once).and_return([player])
      end

      it "does not damage the caster" do
        expect(effect.results).not_to include(instance_of(EffectResult::TakeDamage))
      end
    end

    context "with multiple affected players" do
      let(:affected_players) { [instance_double(Player, active_modifiers: []), instance_double(Player, active_modifiers: [])] }

      before do
        expect(area_of_effect).to receive(:affected_players).at_least(:once).and_return(affected_players)
      end

      it "damages the players" do
        affected_players.each do |player|
          expect(effect.results).to include { |result| result.is_a?(EffectResult::TakeDamage) && result.player == player }
        end
      end
    end

    xcontext "when a player is shielded" do
      let(:affected_player) { instance_double(Player, active_modifiers: [Modifier.new(modifier_type: "shield")]) }

      before do
        expect(area_of_effect).to receive(:affected_players).at_least(:once).and_return([affected_player])
      end

      it "overrides the damage on that player" do
        expect(effect.results).not_to include(instance_of(EffectResult::TakeDamage))
        expect(effect.results).to include(instance_of(EffectResult::ShieldDamage))
      end
    end

    xcontext "when actions are prevented" do
      it "prevents all actions" do
      end
    end
  end
end
