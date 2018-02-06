class TileBoard < Array
  def width
    @width ||= map(&:x).max
  end

  def height
    @height ||= map(&:y).max
  end
end
