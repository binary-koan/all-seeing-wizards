class NotifyConnected
  attr_reader :player

  def initialize(player)
    @player = player
  end

  def call
    player.update!(connected_at: Time.now)
    GameChannel.broadcast_player_updated(player.game, player: player.as_json(methods: [:character, :connected]))
  end
end
