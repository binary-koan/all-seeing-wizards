class Effect::IncreaseDamage < Effect::Base
  def sort_order
    ITEM_ORDER
  end

  def results
    compute_result(EffectResult::IncreaseDamage, player: player, amount: card.amount)
  end
end
