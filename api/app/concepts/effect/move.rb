class Effect::Move < Effect::Base
  def sort_order
    MOVE_ORDER
  end

  def results
    compute_results(EffectResult::Move, caster: player, target: player, target_position: target_position)
  end

  def target_position
    @target_position ||= card.amount.times.reduce(starting_position) do |position, _|
      if can_move_to?(position.forward)
        position.forward
      else
        break position
      end
    end
  end

  private

  def can_move_to?(position)
    position.clamp(game.tiles) == position && game.players.at(position).nil?
  end

  def starting_position
    player.position.turn(card.rotation)
  end
end
