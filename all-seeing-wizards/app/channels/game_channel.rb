class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_for message_client.game
  end

  def unsubscribed
  end

  def player_connected(data)
    p data
    NotifyConnected.new(Player.find(data[:player_id])).call
  end
end
