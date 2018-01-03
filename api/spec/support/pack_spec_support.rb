module PackSpecSupport
  def create_pack_with_boards!
    pack = Pack.create!(name: "Pack with Boards")

    4.times.map { pack.boards.create! }

    pack
  end
end
