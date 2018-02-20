require "rails_helper"

RSpec.describe PerformActions do
  include PackSpecSupport

  describe "integration example" do
    # Base state
    # . . . . .
    # . . ^ . .
    # . . ^ . .
    # Action 1: Player 1 moves forward 1, player 2 turns east and moves
    # . . ^ . .
    # . . . . .
    # . . . > .
    # Action 2: Player 1 attacks front and back, player 2 moves into range
    # . . ^ . .
    # . . . . .
    # . . < . .
    # Action 3: Player 1 attacks front and back, player 2 heals
    # . . ^ . .
    # . . . . .
    # . . < . .

    subject(:service) { PerformActions.new(game) }

    let(:pack) { create_realistic_pack! }

    let(:game) { CreateGame.new(pack_ids: [pack.id]).call }

    let(:players) do
      [
        game.players.create!(
          character: Character.no_powers.new(pack: pack),
          x: 2,
          y: 2,
          rotation: Rotation::NORTH,
          hp: 3
        ),
        game.players.create!(
          character: Character.no_powers.new(pack: pack),
          x: 2,
          y: 3,
          rotation: Rotation::NORTH,
          hp: 3
        )
      ]
    end

    before do
      players.first.player_cards.create!(played_index: 0, card: pack.cards.increase_damage.create!(name: "Power Up", amount: 1, duration_type: Card::DURATION_ACTION, duration: 2))
      players.first.player_cards.create!(played_index: 1, card: pack.cards.attack.create!(
        name: "Attack",
        damage: 1,
        card_ranges: [
          CardRange.line.new(position: "in_front"),
          CardRange.line.new(position: "behind")
        ]
      ))
      players.first.player_cards.create!(played_index: 2, card: pack.cards.attack.create!(
        name: "Attack",
        damage: 2,
        card_ranges: [
          CardRange.line.new(position: "in_front"),
          CardRange.line.new(position: "behind")
        ]
      ))

      players.second.player_cards.create!(played_index: 0, card: pack.cards.move.create!(name: "Turn", amount: 1, rotation: Rotation::CLOCKWISE))
      players.second.player_cards.create!(played_index: 1, card: pack.cards.move.create!(name: "Reverse", amount: 1, rotation: Rotation::REVERSE))
      players.second.player_cards.create!(played_index: 2, card: pack.cards.heal.create!(name: "Heal", amount: 2))
    end

    it "performs the actions and returns the results" do
      expect(service.call).to match [
        [an_instance_of(EffectResult::IncreaseDamage), an_instance_of(EffectResult::Move)],
        [an_instance_of(EffectResult::Move), an_instance_of(EffectResult::Attack), an_instance_of(EffectResult::TakeDamage)],
        [an_instance_of(EffectResult::Heal), an_instance_of(EffectResult::Attack), an_instance_of(EffectResult::TakeDamage)]
      ]

      players.each(&:reload)

      expect(players.first.position).to eq Position.new(x: 2, y: 2, facing: Rotation::NORTH)
      expect(players.first.hp).to eq 3
      expect(players.second.position).to eq Position.new(x: 2, y: 3, facing: Rotation::WEST)
      expect(players.second.hp).to eq 1
    end
  end
end
