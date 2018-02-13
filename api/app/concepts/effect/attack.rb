class Effect::Attack < Effect::Base
  delegate :affected_players, :affected_tiles, to: :area_of_effect

  def sort_order
    ATTACK_ORDER
  end

  def results
    compute_results(EffectResult::Attack, tiles: affected_tiles, caster: player) +
      target_players.flat_map { |target| compute_results(EffectResult::TakeDamage, caster: player, target: target, damage: card.damage) }
  end

  def post_action_results
    return [] unless card.knockback && card.knockback > 0

    target_players.flat_map { |target| compute_results(EffectResult::Knockback, caster: player, target: target, target_position: knockback_position(target)) }
  end

  private

  def target_players
    affected_players.select { |p| p != player }
  end

  def knockback_position(player)
    #TODO backward relative to the caster
    player.position.backward(card.knockback).clamp(
      min_x: game.tiles.min_x,
      min_y: game.tiles.min_y,
      max_x: game.tiles.max_x,
      max_y: game.tiles.max_y
    )
  end

  def area_of_effect
    @area_of_effect ||= AreaOfEffect.new(players: game.players, tiles: game.tiles, ranges: card.card_ranges)
  end
end
