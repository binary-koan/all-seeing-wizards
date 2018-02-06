class Effect::Attack < Effect::Base
  delegate :affected_players, :affected_tiles, to: :area_of_effect

  def sort_order
    ATTACK_ORDER
  end

  def results
    [compute_result(EffectResult::Attack, tiles: affected_tiles)] +
      target_players.map { |player| compute_result(EffectResult::TakeDamage, player: player, damage: card.damage) }
  end

  def post_action_results
    return [] unless card.knockback && card.knockback > 0

    target_players.map { |player| compute_result(EffectResult::Knockback, player: player, knockback: card.knockback) }
  end

  private

  def target_players
    affected_players.select { |p| p != player }
  end

  def area_of_effect
    @area_of_effect ||= AreaOfEffect.new(players: game.players, tiles: game.tiles, ranges: card.card_ranges)
  end
end
