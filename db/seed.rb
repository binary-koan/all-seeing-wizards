require_relative "../system/boot"

class SeedDatabase
  DECKS_PATH = File.dirname(__FILE__) + "/seed/decks"

  ALL_RANGE = "all"
  POINT_RANGE = "point"
  AREA_RANGE_MATCHER = /\A(?<size>\d+)x\k<size> area (?<position>in_front|around)\z/
  LINE_RANGE_MATCHER = /\Aline( (?<position>left|right|behind))?\z/

  DURATION_MATCHER = /((?<number>\d+) )?(?<type>action|turn)s?/
  DEFAULT_DURATION = 1

  def call
    decks.each { |deck| load_deck(deck) }
  end

  private

  def load_deck(attributes)
    deck = create_deck.call(
      name: attributes[:name],
      description: attributes[:description]
    )

    attributes[:cards].each { |card_attributes| load_card(card_attributes, deck) }
  end

  def load_card(attributes, deck)
    name, tagline = attributes[:name].split(" of ")

    card = create_card.call({
      deck_id: deck.id,
      name: name,
      tagline: tagline,

      effect: attributes[:effect],

      amount: attributes[:amount],
      rotation: attributes[:rotation],
      damage: attributes[:damage],
      knockback: attributes[:knockback],
    }.merge(parse_duration(attributes[:duration]) || {}))

    load_range(attributes[:range], card)
  end

  def load_range(descriptor, card)
    return unless descriptor
    return descriptor.each { |r| load_range(r, card) } if descriptor.respond_to?(:each)

    create_card_range.call({
      card_id: card.id
    }.merge(parse_range(descriptor) || {}))
  end

  def parse_range(descriptor)
    if descriptor == ALL_RANGE
      { type: "all" }
    elsif descriptor == POINT_RANGE
      { type: "point" }
    elsif (match = AREA_RANGE_MATCHER.match(descriptor))
      { type: "area", size: match[:size], position: match[:position] }
    elsif (match = LINE_RANGE_MATCHER.match(descriptor))
      { type: "line", position: match[:position] }
    else
      raise "Invalid range: #{descriptor}"
    end
  end

  def parse_duration(descriptor)
    if (match = DURATION_MATCHER.match(descriptor))
      { duration_type: match[:type], duration: match[:number] || DEFAULT_DURATION }
    elsif descriptor
      raise "Invalid duration: #{descriptor}"
    end
  end

  def decks
    Dir.glob(DECKS_PATH + "/*.yml").map do |path|
      YAML.load(File.read(path))
    end
  end

  def create_deck
    @create_deck ||= DeckRepo.new.method(:create)
  end

  def create_card
    @create_card ||= CardRepo.new.method(:create)
  end

  def create_card_range
    @create_card_range ||= CardRangeRepo.new.method(:create)
  end

  class DeckRepo < AllSeeingWizards::Repository[:decks]
    commands :create
  end

  class CardRepo < AllSeeingWizards::Repository[:cards]
    commands :create
  end

  class CardRangeRepo < AllSeeingWizards::Repository[:card_ranges]
    commands :create
  end
end

SeedDatabase.new.call
