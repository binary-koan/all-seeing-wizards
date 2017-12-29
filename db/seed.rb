require_relative "../system/boot"
require "entities/board"
require "entities/board_tile"
require "entities/board_object"

module Creator
  def self.for(relation)
    class_for(relation).new
  end

  private

  def self.class_for(relation)
    Class.new(AllSeeingWizards::Repository[relation]) do
      commands :create
    end
  end
end

class SeedDatabase
  DECKS_PATH = File.dirname(__FILE__) + "/seed/decks"

  def call
    decks.each { |deck| load_deck(deck) }
  end

  private

  def load_deck(attributes)
    deck = create_deck.call(
      name: attributes[:name],
      description: attributes[:description]
    )

    SeedCards.new.call(attributes[:cards], deck: deck)
    SeedBoards.new.call(attributes[:boards], deck: deck)
  end

  def decks
    Dir.glob(DECKS_PATH + "/*.yml").map do |path|
      YAML.load(File.read(path))
    end
  end

  def create_deck
    @create_deck ||= Creator.for(:decks).method(:create)
  end
end

class SeedBoards
  BOARD_SIZE = Entities::Board::SIZE
  EXPECTED_POINTS = BOARD_SIZE ** 2

  DEFAULT_TILE_TYPE = Entities::BoardTile::TYPE_GROUND
  POINT_TILE_MAPPINGS = {
    "." => Entities::BoardTile::TYPE_GROUND,
    "b" => Entities::BoardTile::TYPE_BLOCK,
    "w" => Entities::BoardTile::TYPE_WATER,
    "l" => Entities::BoardTile::TYPE_LAVA
  }
  POINT_OBJECT_MAPPINGS = {
    "r" => Entities::BoardObject::TYPE_ROCK
  }

  def call(boards, deck:)
    boards.each { |board_definition| load_board(board_definition, deck) }
  end

  private

  def load_board(board_definition, deck)
    point_definitions = board_definition.split(/\s+/).reject(&:empty?)
    raise "Wrong number of points for a board: #{point_definitions.join(", ")}" unless point_definitions.size == EXPECTED_POINTS

    board = create_board.call(deck_id: deck.id)
    point_definitions.each.with_index { |point, i| load_point(point, i, board) }
  end

  def load_point(point, index, board)
    if POINT_TILE_MAPPINGS[point]
      create_tile.call(board_id: board.id, index: index, type_id: POINT_TILE_MAPPINGS[point])
    elsif POINT_OBJECT_MAPPINGS[point]
      create_tile.call(board_id: board.id, index: index, type_id: DEFAULT_TILE_TYPE)
      create_object.call(board_id: board.id, x: x_from(index), y: y_from(index), type_id: POINT_OBJECT_MAPPINGS[point])
    else
      raise "Unknown point definition: #{point}"
    end
  end

  def x_from(index)
    index % BOARD_SIZE
  end

  def y_from(index)
    (index / BOARD_SIZE).to_i
  end

  def create_board
    @create_board ||= Creator.for(:boards).method(:create)
  end

  def create_tile
    @create_tile ||= Creator.for(:board_tiles).method(:create)
  end

  def create_object
    @create_object ||= Creator.for(:board_objects).method(:create)
  end
end

class SeedCards
  ALL_RANGE = "all"
  POINT_RANGE = "point"
  AREA_RANGE_MATCHER = /\A(?<size>\d+)x\k<size> area (?<position>in_front|around)\z/
  LINE_RANGE_MATCHER = /\Aline( (?<position>left|right|behind))?\z/

  DURATION_MATCHER = /((?<number>\d+) )?(?<type>action|turn)s?/
  DEFAULT_DURATION = 1

  def call(cards, deck:)
    cards.each { |card_attributes| load_card(card_attributes, deck) }
  end

  private

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

  def create_card
    @create_card ||= Creator.for(:cards).method(:create)
  end

  def create_card_range
    @create_card_range ||= Creator.for(:card_ranges).method(:create)
  end
end

SeedDatabase.new.call
