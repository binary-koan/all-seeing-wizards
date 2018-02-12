class Host < ApplicationRecord
  include Connectable

  belongs_to :game

  def host?
    true
  end

  def player?
    false
  end
end
