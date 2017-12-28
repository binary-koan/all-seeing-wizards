require "hashids"

module Entities
  class Game < ROM::Struct
    class << self
      def decode_hashid(hashid)
        hashids.decode(hashid)
      end

      def encode_hashid(id)
        hashids.encode(id)
      end

      private

      def hashids
        @hashids ||= Hashids.new("TODO salt from somewhere in env?", 6, "abcdefghijklmnopqrstuvwxyz")
      end
    end

    def hashid
      @hashid ||= self.class.encode_hashid(id)
    end
  end
end
