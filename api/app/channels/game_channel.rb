class GameChannel < ApplicationCable::Channel
  def subscribed
    NotifyConnected.new(message_client).call if message_client.is_a?(Player)
    stream_for message_client.game
  end

  def unsubscribed
    NotifyDisconnected.new(message_client).call if message_client.is_a?(Player)
  end
end
