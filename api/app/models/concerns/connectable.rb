module Connectable
  def connected?
    return false unless connected_at?

    disconnected_at.nil? || connected_at > disconnected_at
  end

  def disconnected?
    !connected?
  end
end
