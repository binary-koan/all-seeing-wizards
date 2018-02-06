class EffectResult::PreventActions
  attr_reader :player, :duration_type, :duration

  def initialize(player:, duration_type:, duration:)
    @player = player
    @duration_type = duration_type
    @duration = duration
  end
end
