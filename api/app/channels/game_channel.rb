class GameChannel < ApplicationCable::Channel
  def self.on(event, &handler)
    define_method(event) do |data|
      instance_exec(data, &handler)
      NotifyConnected.new(message_client).call if message_client.is_a?(Player)
    end
  end

  def subscribed
    NotifyConnected.new(message_client).call if message_client.is_a?(Player)
    stream_for message_client.game
  end

  def unsubscribed
    NotifyDisconnected.new(message_client).call if message_client.is_a?(Player)
  end

  on :start_game do
    StartGame.new(message_client.game).call
  end
end
