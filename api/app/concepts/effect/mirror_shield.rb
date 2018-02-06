class Effect::MirrorShield < Effect::Base
  def sort_order
    ITEM_ORDER
  end

  def results
    compute_results(EffectResult::MirrorShield, player: player, duration_type: card.duration_type, duration: card.duration)
  end
end
