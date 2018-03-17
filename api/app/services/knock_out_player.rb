class KnockOutPlayer
  attr_reader :player

  def initialize(player)
    @player = player
  end

  def call
    player.player_cards.destroy_all
  end
end
