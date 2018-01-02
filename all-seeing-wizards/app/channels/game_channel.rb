class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_for message_client.game
  end

  def unsubscribed
  end
end
