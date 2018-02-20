class PerformActions
  attr_reader :game

  delegate :player_cards, :players, to: :game

  def initialize(game)
    @game = game
  end

  def call
    game.transaction do
      action_groups.each do |player_cards|
        apply_results!(player_cards)
        next_action!
      end

      next_turn!
    end

    all_results
  end

  private

  def action_groups
    player_cards.preload(:card).played.order(:played_index).
      group_by(&:played_index).
      map { |_, player_cards| player_cards.sort_by { |pc| pc.effect.sort_order } }
  end

  def apply_results!(player_cards)
    applied_results = player_cards.
      map(&:effect).
      group_by(&:sort_order).
      sort_by(&:first).
      flat_map { |_, effects| apply_effects!(effects, :results) + apply_effects!(effects, :post_action_results) }

    all_results << applied_results
  end

  def apply_effects!(effects, results_method)
    results = effects.each(&:reload).flat_map(&results_method)
    results = results.reject { |result| results.any? { |other| result.conflicts_with?(other) } }
    results.each(&:apply!)
  end

  def next_action!
    modifiers.each do |modifier|
      modifier.next_action!
    end
  end

  def next_turn!
    modifiers.each do |modifier|
      modifier.next_turn!
    end
  end

  def modifiers
    Modifier.active.where(player_id: players.map(&:id))
  end

  def all_results
    @all_results ||= []
  end
end
