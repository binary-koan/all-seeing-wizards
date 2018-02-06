class Effect::Move < Effect::Base
  def sort_order
    MOVE_ORDER
  end

  # def conflicts_with?(other)
  #   other.respond_to?(:resulting_space) && resulting_space == other.resulting_space
  # end

  def results
    compute_result(EffectResult::Move, player: player, to: resulting_space)
  end

  def resulting_space
    player.position.forward(card.amount)
  end
end
