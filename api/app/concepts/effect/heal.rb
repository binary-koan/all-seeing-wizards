class Effect::Heal < Effect::Base
  def sort_order
    ITEM_ORDER
  end

  def results
    compute_results(EffectResult::Heal, player: player, amount: card.amount)
  end
end
