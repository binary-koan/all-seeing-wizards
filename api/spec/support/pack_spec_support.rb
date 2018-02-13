module PackSpecSupport
  def create_pack_with_boards!
    pack = Pack.create!(name: "Pack with Boards")

    4.times.map { pack.boards.create! }

    pack
  end

  def setup_plain_board!(board)
    (Board::SIZE ** 2).times do |index|
      board.board_tiles.create!(index: index, type_id: BoardTile::TYPE_GROUND)
    end
  end

  def add_character!(pack)
    pack.characters.create!(name: "Character 1", character_type: Character::CHARACTER_TYPE_MAPPINGS.keys.first)
  end
end
