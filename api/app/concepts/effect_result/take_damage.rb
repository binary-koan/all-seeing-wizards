class EffectResult::TakeDamage
  attr_reader :player, :damage

  def initialize(player:, damage:)
    @player = player
    @damage = damage
  end
end
