class NotifyConnected
  attr_reader :player

  def initialize(player)
    @player = player
  end

  def call
    return if player.connected?

    player.update!(connected_at: Time.now)
    GameChannel.broadcast_to(player.game, event: "player_updated", player: player.as_json(methods: [:character, :connected]))
  end
end
