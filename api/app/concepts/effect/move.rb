class Effect::Move < Effect::Base
  def sort_order
    MOVE_ORDER
  end

  def results
    compute_results(EffectResult::Move, caster: player, target: player, target_position: target_position)
  end

  def target_position
    p player
    puts "turning #{player.position.facing_direction} by #{card.rotation} => #{player.position.turn(card.rotation).facing_direction}"
    player.position.turn(card.rotation).forward(card.amount).clamp(game.tiles)
  end
end
