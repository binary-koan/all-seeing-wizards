class PickActions
  attr_reader :requested_by, :ids

  delegate :game, :player_cards, to: :requested_by

  def initialize(requested_by:, picked_ids:)
    @requested_by = requested_by
    @ids = picked_ids
  end

  def call
    return fail("not_a_player") unless requested_by.player?
    return fail("no_cards") unless ids.present?
    return fail("cards_not_in_hand") unless cards_in_hand?

    game.transaction do
      ids.each.with_index { |id, index| place_card!(id, index) }
    end

    GameChannel.broadcast_to(game, event: "hand_updated", player_cards: player_cards.as_json(include: [:card]))
    AdvanceGame.new(game).call
  end

  private

  def place_card!(id, index)
    player_cards.find { |pc| pc.id == id }.update!(played_index: index)
  end

  def cards_in_hand?
    ids.all? { |id| player_card_ids.include?(id) }
  end

  def player_card_ids
    @player_card_ids = player_cards.map(&:id)
  end

  def fail(reason)
    GameChannel.broadcast_to(game, event: "submit_cards_failed", error: reason)
  end
end
