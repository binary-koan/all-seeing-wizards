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

  def reload
    player.reload
  end

  protected

  def compute_results(result_type, **attrs)
    original_result = result_type.new(attrs.merge(card: card))

    replacements = []
    replacements += caster_replacement_results(attrs[:caster].active_modifiers, original_result) if attrs[:caster]

    if attrs[:target]
      replacements += ([original_result] + replacements.map(&:second)).flat_map do |result|
        target_replacement_results(attrs[:target].active_modifiers, result)
      end
    end

    priority_results(replacements.select(&:second)).presence || [original_result]
  end

  private

  def priority_results(replacements)
    priority = replacements.map { |modifier, _| modifier.priority }.min

    replacements.reject { |modifier, _| modifier.priority != priority }.map(&:second)
  end

  def caster_replacement_results(modifiers, original_result)
    modifiers.map { |modifier| [modifier, modifier.replace_result_as_caster(original_result)] }
  end

  def target_replacement_results(modifiers, original_result)
    modifiers.map { |modifier| [modifier, modifier.replace_result_as_target(original_result)] }
  end
end
