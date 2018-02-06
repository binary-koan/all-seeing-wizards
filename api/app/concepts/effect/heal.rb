class Effect::Heal < Effect::Base
  def sort_order
    ITEM_ORDER
  end

  def results
    compute_result(EffectResult::Heal, player: player, amount: card.amount)
  end
end
