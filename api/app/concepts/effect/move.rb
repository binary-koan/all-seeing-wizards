class Effect::Move < Effect::Base
  def sort_order
    MOVE_ORDER
  end

  def results
    compute_results(EffectResult::Move, caster: player, target: player, target_position: target_position)
  end

  def target_position
    #TODO facing direction
    player.position.forward(card.amount).clamp(
      min_x: game.tiles.min_x,
      min_y: game.tiles.min_y,
      max_x: game.tiles.max_x,
      max_y: game.tiles.max_y
    )
  end
end
