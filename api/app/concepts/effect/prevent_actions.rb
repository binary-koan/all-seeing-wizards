class Effect::PreventActions < Effect::Base
  delegate :affected_players, :affected_tiles, to: :area_of_effect

  def sort_order
    OVERRIDE_ORDER
  end

  def results
    compute_results(EffectResult::AttemptPreventActions, caster: player, tiles: affected_tiles) +
      target_players.flat_map do |target|
        compute_results(EffectResult::PreventActions, caster: player, target: target, duration_type: card.duration_type, duration: card.duration)
      end
  end

  private

  def target_players
    affected_players.select { |p| p != player }
  end

  def area_of_effect
    AreaOfEffect.new(players: game.players, tiles: game.tiles, ranges: card.card_ranges)
  end
end
