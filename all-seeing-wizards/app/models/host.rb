class Host < ApplicationRecord
  include Connectable

  belongs_to :game
end
