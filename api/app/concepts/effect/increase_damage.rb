class Effect::IncreaseDamage < Effect::Base
  def sort_order
    ITEM_ORDER
  end

  def results
    compute_results(EffectResult::IncreaseDamage, player: player, amount: card.amount)
  end
end
