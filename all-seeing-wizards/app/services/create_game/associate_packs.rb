class CreateGame
  class AssociatePacks
    attr_reader :game, :pack_ids

    def initialize(pack_ids:, game:)
      @game = game
      @pack_ids = pack_ids
    end

    def call
      raise CannotCreate, :no_packs_given unless packs_given?
      raise CannotCreate, :cannot_find_packs unless all_packs_found?

      packs.each { |pack| game.game_packs.create!(pack: pack) }
      packs
    end

    private

    def packs_given?
      pack_ids.is_a?(Enumerable) && pack_ids.any? && pack_ids.all? { |id| id.respond_to?(:to_i) }
    end

    def all_packs_found?
      packs.size == pack_ids.size
    end

    def packs
      @packs ||= Pack.where(id: pack_ids.map(&:to_i))
    end
  end
end
