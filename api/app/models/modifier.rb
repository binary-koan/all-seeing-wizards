class Modifier < ApplicationRecord
  belongs_to :attached_to, polymorphic: true

  scope :active, -> { where("duration > 0") }
end
