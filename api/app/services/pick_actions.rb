class PickActions
  include Result::Mixin

  attr_reader :player_cards, :ids

  def initialize(player_cards, picked_ids:)
    @player_cards = player_cards
    @ids = picked_ids
  end

  def call
    return Failure(:no_cards) unless ids.present?
    return Failure(:cards_not_in_hand) unless cards_in_hand?

    ids.each.with_index { |id, index| place_card!(id, index) }

    Success
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
end
