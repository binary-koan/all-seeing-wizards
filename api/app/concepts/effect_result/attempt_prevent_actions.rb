class EffectResult::AttemptPreventActions < EffectResult::Base
  attr_reader :tiles

  def initialize(tiles:, caster:, card:)
    super(caster: caster, target: nil, card: card)

    @tiles = tiles
  end

  def default_json
    super.merge(tiles: tiles.map(&:default_json))
  end
end
