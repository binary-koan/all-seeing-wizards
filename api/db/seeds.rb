class SeedDatabase
  PACKS_PATH = File.dirname(__FILE__) + "/seeds/packs"

  def call
    ActiveRecord::Base.transaction do
      packs.each { |pack| load_pack(pack) }
    end
  end

  private

  def load_pack(attributes)
    pack = Pack.create!(attributes.slice(:name, :description))

    SeedCards.new.call(attributes[:cards], pack: pack)
    SeedBoards.new.call(attributes[:boards], pack: pack)
    SeedCharacters.new.call(attributes[:characters], pack: pack)
  end

  def packs
    Dir.glob(PACKS_PATH + "/*.yml").map do |path|
      YAML.load(File.read(path))
    end
  end
end

class SeedBoards
  BOARD_SIZE = Board::SIZE
  EXPECTED_POINTS = BOARD_SIZE ** 2

  DEFAULT_TILE_TYPE = BoardTile::TYPE_GROUND
  POINT_TILE_MAPPINGS = {
    "." => BoardTile::TYPE_GROUND,
    "b" => BoardTile::TYPE_BLOCK,
    "w" => BoardTile::TYPE_WATER,
    "l" => BoardTile::TYPE_LAVA
  }
  POINT_OBJECT_MAPPINGS = {
    "r" => BoardObject::TYPE_ROCK
  }

  def call(boards, pack:)
    boards.each { |board_definition| load_board(board_definition, pack) }
  end

  private

  def load_board(board_definition, pack)
    point_definitions = board_definition.split(/\s+/).reject(&:empty?)
    raise "Wrong number of points for a board: #{point_definitions.join(", ")}" unless point_definitions.size == EXPECTED_POINTS

    board = pack.boards.create!
    point_definitions.each.with_index { |point, i| load_point(point, i, board) }
  end

  def load_point(point, index, board)
    if POINT_TILE_MAPPINGS[point]
      board.board_tiles.create!(index: index, type_id: POINT_TILE_MAPPINGS[point])
    elsif POINT_OBJECT_MAPPINGS[point]
      board.board_tiles.create!(index: index, type_id: DEFAULT_TILE_TYPE)
      board.board_objects.create!(x: x_from(index), y: y_from(index), type_id: POINT_OBJECT_MAPPINGS[point])
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
end

class SeedCards
  WHOLE_MAP_RANGE = "whole_map"
  POINT_RANGE = "point"
  AREA_RANGE_MATCHER = /\A(?<size>\d+)x\k<size> area (?<position>in_front|around)\z/
  LINE_RANGE_MATCHER = /\Aline( (?<position>left|right|behind))?\z/

  DURATION_MATCHER = /((?<number>\d+) )?(?<type>action|turn)s?/
  DEFAULT_DURATION = 1

  def call(cards, pack:)
    cards.each { |card_attributes| load_card(card_attributes, pack) }
  end

  private

  def load_card(attributes, pack)
    name, tagline = attributes[:name].split(" of ")

    card = pack.cards.create!({
      name: name,
      tagline: tagline,

      effect_id: attributes[:effect],

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

    card.card_ranges.create!(parse_range(descriptor))
  end

  def parse_range(descriptor)
    if descriptor == WHOLE_MAP_RANGE
      { type_id: "whole_map" }
    elsif descriptor == POINT_RANGE
      { type_id: "point" }
    elsif (match = AREA_RANGE_MATCHER.match(descriptor))
      { type_id: "area", size: match[:size], position: match[:position] }
    elsif (match = LINE_RANGE_MATCHER.match(descriptor))
      { type_id: "line", position: match[:position] }
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
end

class SeedCharacters
  def call(characters, pack:)
    characters.each { |character| load_character(character, pack) }
  end

  private

  def load_character(character, pack)
    raise "No rules defined for type #{character[:character_type]}" unless mapping_for?(character[:character_type])
    pack.characters.create!(character)
  end

  def mapping_for?(character_type)
    Character::CHARACTER_TYPE_MAPPINGS.has_key?(character_type)
  end
end

SeedDatabase.new.call
