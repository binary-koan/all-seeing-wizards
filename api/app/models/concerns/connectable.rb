module Connectable
  def connected?
    return false unless connected_at?

    disconnected_at.nil? || connected_at > disconnected_at
  end
  alias_method :connected, :connected?

  def disconnected?
    !connected?
  end
  alias_method :disconnected, :disconnected?
end
