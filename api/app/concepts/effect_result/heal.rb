class EffectResult::Heal
  attr_reader :player, :amount

  def initialize(player:, amount:)
    @player = player
    @amount = amount
  end
end
