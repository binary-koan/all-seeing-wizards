module PackSpecSupport
  def create_realistic_pack!
    pack = create_pack_with_boards!
    pack.boards.each { |board| setup_plain_board!(board) }
    4.times { |i| pack.characters.no_powers.create!(name: "Character #{i + 1}") }

    pack
  end

  def create_pack_with_boards!
    pack = Pack.create!(name: "Pack with Boards")

    4.times { pack.boards.create! }

    pack
  end

  def setup_plain_board!(board)
    (Board::SIZE ** 2).times do |index|
      board.board_tiles.create!(index: index, type_id: BoardTile::TYPE_GROUND)
    end
  end

  def add_character!(pack)
    pack.characters.no_powers.create!(name: "Character 1")
  end
end
