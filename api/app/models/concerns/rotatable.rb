module Rotatable
  def self.included(model)
    model.validates :rotation, inclusion: { in: Position::DIRECTIONS }
  end
end
