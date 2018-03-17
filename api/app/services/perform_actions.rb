class PerformActions
  attr_reader :game

  delegate :player_cards, :players, to: :game

  def initialize(game)
    @game = game
  end

  def call
    game.transaction do
      Player::MAX_HP.times do |i|
        apply_results!(action_group(i))
        next_action!
      end

      next_turn!
    end

    all_results
  end

  private

  def action_group(i)
    player_cards.preload(:card).where(played_index: i).
      sort_by { |pc| pc.effect.sort_order }
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
    players.where(hp: 0).each do |player|
      KnockOutPlayer.new(player).call
    end

    modifiers.each do |modifier|
      modifier.next_action!
    end
  end

  def next_turn!
    modifiers.each do |modifier|
      modifier.next_turn!
    end

    #TODO discard instead of destroy (don't reuse until necessary)
    player_cards.played.each(&:destroy!)
    DrawHands.new(game.reload).call
  end

  def modifiers
    Modifier.active.where(player_id: players.map(&:id))
  end

  def all_results
    @all_results ||= []
  end
end
