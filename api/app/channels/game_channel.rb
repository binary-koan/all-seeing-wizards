class GameChannel < ApplicationCable::Channel
  [
    "actions_performed",
    "player_updated",
    "submit_cards_failed",
    "hand_updated",
    "game_started",
    "cannot_start_game"
  ].each do |event|
    define_singleton_method "broadcast_#{event}" do |game, data = {}|
      broadcast_to game, data.merge(event: event)
    end
  end

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
