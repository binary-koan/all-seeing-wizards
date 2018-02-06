class EffectResult::Move
  attr_reader :player, :target

  def initialize(player:, target:)
    @player = player
    @target = target
  end
end
