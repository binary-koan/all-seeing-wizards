class Effect::Base
  OVERRIDE_ORDER = 0
  ITEM_ORDER = 1
  MOVE_ORDER = 2
  ATTACK_ORDER = 3

  attr_reader :card, :player

  delegate :game, to: :player

  def initialize(card, player)
    @card = card
    @player = player
  end

  def conflicts_with?(other)
    false
  end

  def results
    []
  end

  def post_action_results
    []
  end

  protected

  def compute_result(result_type, player: nil, **attrs)
    if player.present?
      original_result = result_type.new(player: player, **attrs)

      priority_results(
        replacement_results(player.active_modifiers, original_result) +
          replacement_results(game.active_modifiers, original_result)
      ).presence || original_result
    else
      original_result = result_type.new(**attrs)

      priority_results(
        replacement_results(game.active_modifiers, original_result)
      ).presence || original_result
    end
  end

  private

  def priority_results(replacements)
    priority = replacements.min { |modifier, _| modifier.priority }

    replacements.reject { |modifier, _| modifier.priority != priority }.map(&:second)
  end

  def replacement_results(modifiers, original_result)
    modifiers.map { |modifier| [modifier, modifier.replacement_result(original_result)] }
  end
end
