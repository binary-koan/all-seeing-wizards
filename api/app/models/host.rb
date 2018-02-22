class Host < ApplicationRecord
  include Connectable

  belongs_to :game

  def host?
    true
  end

  def player?
    false
  end

  def default_json
    {
      id: id,
      connected: connected?
    }
  end
end
