class Effect::Move < Effect::Base
  def sort_order
    MOVE_ORDER
  end

  def results
    compute_results(EffectResult::Move, caster: player, target: player, target_position: target_position)
  end

  def target_position
    #TODO facing direction
    player.position.forward(card.amount).clamp(game.tiles)
  end
end
