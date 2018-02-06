class EffectResult::Attack < EffectResult::Base
  attr_reader :tiles, :caster

  def initialize(tiles:, caster:)
    @tiles = tiles
    @caster = caster
  end
end
