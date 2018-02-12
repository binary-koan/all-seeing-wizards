class GameChannel < ApplicationCable::Channel
  def subscribed
    NotifyConnected.new(message_client).call if message_client.player?
    stream_for message_client.game
  end

  def unsubscribed
    NotifyDisconnected.new(message_client).call if message_client.player?
  end

  def start_game
    StartGame.new(requested_by: message_client).call
  end

  def submit_cards(data)
    PickActions.new(requested_by: message_client, picked_ids: data["card_ids"]).call
  end
end
