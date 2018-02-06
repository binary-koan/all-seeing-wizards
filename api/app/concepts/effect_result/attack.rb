class EffectResult::Attack
  attr_reader :tiles

  def initialize(tiles:)
    @tiles = tiles
  end
end
