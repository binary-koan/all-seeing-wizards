class NotifyDisconnected
  attr_reader :player

  def initialize(player)
    @player = player
  end

  def call
    player.update!(disconnected_at: Time.now)
    GameChannel.broadcast_player_updated(player.game, player: player.full_json)
  end
end
