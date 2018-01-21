class PickActions
  include Result::Mixin

  attr_reader :player_cards, :card_ids

  def initialize(player_cards, card_ids:)
    @player_cards = player_cards
    @card_ids = card_ids
  end

  def call
    return Failure(:no_cards) unless card_ids.present?
    return Failure(:cards_not_in_hand) unless cards_in_hand?

    card_ids.each.with_index { |card_id, index| place_card!(card_id, index) }

    Success
  end

  private

  def place_card!(card_id, index)
    player_cards.find { |pc| pc.card_id == card_id }.update!(played_index: index)
  end

  def cards_in_hand?
    card_ids.all? { |card_id| player_card_ids.include?(card_id) }
  end

  def player_card_ids
    @player_card_ids = player_cards.map(&:card_id)
  end
end
