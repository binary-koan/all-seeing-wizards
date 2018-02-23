class EffectResult::AttemptPreventActions < EffectResult::Base
  attr_reader :tiles

  def initialize(tiles:, caster:)
    super(caster: caster, target: nil)

    @tiles = tiles
  end

  def default_json
    super.merge(tiles: tiles.map(&:default_json))
  end
end
