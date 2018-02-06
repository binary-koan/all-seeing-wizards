class Effect::PreventActions < Effect::Base
  def sort_order
    OVERRIDE_ORDER
  end

  def results
    [compute_result(EffectResult::AttemptPreventActions, tiles: affected_tiles)] +
      affected_players.map { |player| compute_result(EffectResult::PreventActions, player: player, duration_type: card.duration_type, duration: card.duration) }
  end

  private

  def range
    Range.new(players: game.players, tiles: game.tiles, ranges: card.card_ranges)
  end
end
