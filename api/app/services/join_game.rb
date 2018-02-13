class JoinGame
  attr_reader :game, :player, :error

  delegate :tiles, to: :game

  def initialize(game)
    @game = game
  end

  def call
    return failure(:too_many_players) unless starting_tile.present?

    @player = game.players.create!(
      character: character,
      x: starting_tile.x,
      y: starting_tile.y,
      rotation: Position::NORTH
    )
    true
  end

  private

  def character
    game.available_characters.sample
  end

  def starting_tile
    @starting_tile ||= (starting_tiles - taken_tiles).sample
  end

  def taken_tiles
    starting_tiles.select { |tile| player_on?(tile) }
  end

  def player_on?(tile)
    game.players.find { |player| player.x == tile.x && player.y == tile.y }
  end

  def starting_tiles
    game.game_boards.
      map { |game_board| game_board.board.board_tiles.find_by(index: starting_tile_index) }.
      map { |tile| tiles.find { |wrapper| wrapper.tile == tile } }
  end

  def starting_tile_index
    (Board::SIZE ** 2) / 2
  end

  def failure(reason)
    @error = reason
    false
  end
end
