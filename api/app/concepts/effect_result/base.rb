class EffectResult::Base
  def conflicts_with?(other)
    false
  end

  def apply!
  end
end
