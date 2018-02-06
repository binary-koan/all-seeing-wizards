class EffectResult::Knockback
  attr_reader :player, :knockback

  def initialize(player:, knockback:)
    @player = player
    @knockback = knockback
  end
end
