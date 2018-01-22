class PerformActions
  attr_reader :game

  def initialize(game)
    @game = game
  end

  def call
    game.transaction do
      action_groups.each do |cards|
        apply_actions!(reject_conflicting_actions(cards))
      end
    end
  end

  private

  def action_groups
    game.player_cards.
      played.
      group_by { |player_card| player_card.played_index }.
      sort_by(&:first).
      map { |_, player_cards| sort_by_effect(player_cards) }
  end

  def sort_by_effect(player_cards)
    player_cards.sort_by { |player_card| player_card.effect.sort_order }
  end

  def reject_conflicting_actions(player_cards)
    player_cards.select do |player_card|
      player_cards.none? { |other| player_card != other && player_card.effect.conflicts_with?(other) }
    end
  end

  def apply_actions!(cards)
    cards.each { |card| card.effect.perform!(game) }
  end
end
