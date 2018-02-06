class EffectResult::ShieldDamage
  attr_reader :player

  def initialize(player:)
    @player = player
  end
end
