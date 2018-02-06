class CalculateGameTiles
  attr_reader :game

  def initialize(game)
    @game = game
  end

  def call
    GameBoard.new(all_tiles)
  end

  private

  def all_tiles
    game.game_boards.flat_map { |game_board| tiles_from_board(game_board) }
  end

  def tiles_from_board(game_board)
    game_board.board.board_tiles.map { |tile| tile_on_board(tile, game_board) }
  end

  def tile_on_board(tile, game_board)
    position = position_for(tile)
    offset = offset_for(game_board)

    PositionedTile.new(tile, x: position[:x] + offset[:x], y: position[:y] + offset[:y])
  end

  def position_for(tile)
    {
      x: tile.index % Board::SIZE,
      y: tile.index / Board::SIZE
    }
  end

  def offset_for(game_board)
    @offset_for ||= {}
    @offset_for[game_board] ||= {
      x: (game_board.index % GameBoard::BOARDS_HORIZONTALLY) * Board::SIZE,
      y: (game_board.index / GameBoard::BOARDS_VERTICALLY) * Board::SIZE
    }
  end
end
