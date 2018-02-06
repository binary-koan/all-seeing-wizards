class Effect::IncreaseDamage < Effect::Base
  def sort_order
    ITEM_ORDER
  end

  def results
    compute_results(EffectResult::IncreaseDamage, caster: player, target: player, amount: card.amount)
  end
end
