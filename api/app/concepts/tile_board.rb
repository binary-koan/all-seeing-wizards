class TileBoard < Array
  def min_x
    @min_x ||= map(&:x).min
  end

  def min_y
    @min_y ||= map(&:y).min
  end

  def max_x
    @max_x ||= map(&:x).max
  end

  def max_y
    @max_y ||= map(&:y).max
  end

  def width
    max_x - min_x + 1
  end

  def height
    max_y - min_y + 1
  end
end
