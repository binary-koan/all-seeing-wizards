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

        GameChannel.broadcast_hand_updated(game, player_id: player.id, player_cards: player.player_cards.map(&:full_json))
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
