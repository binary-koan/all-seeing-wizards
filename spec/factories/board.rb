require "entities/board"

Factory.define :board do |f|
  f.association(:board_tiles, count: Entities::Board::SIZE ** 2)
  f.association(:board_objects, count: 4)
end

Factory.define(:board_tile) do |f|
  f.sequence(:index) { |i| i }
  f.type_id 0
end

Factory.define(:board_object) do |f|
  f.sequence(:x) { |i| i / 5 }
  f.sequence(:y) { |i| i % 5 }
  f.type_id 0
end
