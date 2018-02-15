class CardRange < ApplicationRecord
  TYPE_AREA = "area"
  TYPE_LINE = "line"
  TYPE_POINT = "point"
  TYPE_WHOLE_MAP = "whole_map"

  POSITION_AROUND = "around"
  POSITION_IN_FRONT = "in_front"

  ROTATION_MAPPINGS = {
    "in_front" => Rotation::NORTH,
    "left" => Rotation::EAST,
    "behind" => Rotation::SOUTH,
    "right" => Rotation::WEST
  }

  belongs_to :card

  enum type_id: { TYPE_AREA => 0, TYPE_LINE => 1, TYPE_POINT => 2, TYPE_WHOLE_MAP => 3 }
  validates :size, numericality: { greater_than_or_equal_to: 0, allow_nil: true }

  def affected_tiles(tiles, center:)
    case type_id
    when TYPE_AREA
      area_around(tiles, center)
    when TYPE_LINE
      line_from(tiles, center)
    when TYPE_POINT
      point_in_front(center)
    when TYPE_WHOLE_MAP
      tiles
    end
  end

  private

  def area_around(tiles, center)
    offset = (size / 2).floor
    top_left = center.offset(offset, offset).clamp(tiles)
    bottom_right = center.offset(offset, offset).clamp(tiles)

    if position == POSITION_IN_FRONT
      top_left = top_left.forward(offset + 1)
      bottom_right = bottom_right.forward(offset + 1)
    end

    tiles.select do |tile|
      tile.position.x <= top_left.x && tile.position.y <= top_left.y &&
        tile.position.x <= bottom_right.x && tile.position.y <= bottom_right.y
    end
  end

  def line_from(tiles, center)
    point = center.turn(ROTATION_MAPPINGS[position] || Rotation::NONE).forward(1)
    affected_tiles = []

    loop do
      affected_tiles << point
      point = point.forward(1)
      break if point.clamp(tiles) != point
    end

    affected_tiles
  end

  def point_in_front(tiles, center)
    point = center.forward(1)
    tiles.find { |tile| tile.x == point.x && tile.y == point.y }
  end
end
