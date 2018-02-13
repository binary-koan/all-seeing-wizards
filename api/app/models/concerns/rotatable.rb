module Rotatable
  def self.included(model)
    model.validates :rotation, inclusion: { in: Rotation::DIRECTIONS }
  end
end
