class DrawHands
  attr_reader :game

  delegate :players, :available_cards, to: :game

  def initialize(game)
    @game = game
  end

  def call
    ActiveRecord::Base.transaction do
      players.each do |player|
        draw_card_for(player) until player.enough_cards_in_hand?

        GameChannel.broadcast_to(game, event: "hand_updated", player_id: player.id, player_cards: player.player_cards.as_json(include: :card))
      end
    end
  end

  private

  def draw_card_for(player)
    player.add_to_hand!(next_card)
  end

  def next_card
    available_cards.sample
  end
end
