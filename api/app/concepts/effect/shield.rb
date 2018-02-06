class Effect::Shield < Effect::Base
  def sort_order
    ITEM_ORDER
  end

  def results
    compute_result(EffectResult::Shield, player: player, duration_type: card.duration_type, duration: card.duration)
  end
end
