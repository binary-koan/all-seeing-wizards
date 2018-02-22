class EffectResult::AttemptPreventActions < EffectResult::Base
  attr_reader :tiles

  def initialize(tiles:, caster:)
    super(caster: caster, target: nil)

    @tiles = tiles
  end

  def default_json
    super.merge(tile_ids: tiles.map(&:id))
  end
end
