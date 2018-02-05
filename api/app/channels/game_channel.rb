class GameChannel < ApplicationCable::Channel
  # def self.on(event, &handler)
  #   define_method(event) do |data|
  #     instance_exec(data, &handler)
  #     NotifyConnected.new(message_client).call if message_client.is_a?(Player)
  #   end
  # end

  def subscribed
    NotifyConnected.new(message_client).call if message_client.is_a?(Player)
    stream_for message_client.game
  end

  def unsubscribed
    NotifyDisconnected.new(message_client).call if message_client.is_a?(Player)
  end

  def start_game
    StartGame.new(message_client.game).call
  end

  def submit_cards(data)
    return unless message_client.is_a?(Player)

    result = PickActions.new(message_client.player_cards, picked_ids: data["card_ids"]).call

    if result.success?
      GameChannel.broadcast_to(message_client.game, event: "hand_updated", player_cards: message_client.player_cards.as_json(include: [:card]))
    else
      GameChannel.broadcast_to(message_client.game, event: "submit_cards_failed", error: result.error)
    end
  end
end
