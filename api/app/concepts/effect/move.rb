class Effect::Move < Effect::Base
  def sort_order
    MOVE_ORDER
  end

  #TODO not this since it needs to override knockback
  # def conflicts_with?(other)
  #   other.respond_to?(:resulting_space) && resulting_space == other.resulting_space
  # end

  def results
    compute_results(EffectResult::Move, caster: player, target_position: target_position)
  end

  def target_position
    player.position.forward(card.amount).clamp(
      min_x: 0,
      min_y: 0,
      max_x: game.tiles.width,
      max_y: game.tiles.height
    )
  end
end
