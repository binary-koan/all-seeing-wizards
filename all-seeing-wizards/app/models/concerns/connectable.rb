module Connectable
  def connected?
    return false unless connected_at?

    disconnected_at.nil? || connected_at > disconnected_at
  end
  alias_method :connected, :connected?
end
