class Effect::Heal < Effect::Base
  def sort_order
    ITEM_ORDER
  end

  def results
    compute_results(EffectResult::Heal, caster: player, target: player, amount: card.amount)
  end
end
