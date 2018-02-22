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

    GameChannel.broadcast_hand_updated(game, player_id: requested_by.id, player_cards: player_cards.map(&:full_json))
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
    GameChannel.broadcast_submit_cards_failed(game, error: reason)
  end
end
