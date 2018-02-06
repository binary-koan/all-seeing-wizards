module Broadcaster
  def self.[](channel:, broadcast_to:, fail_with:, succeed_with:)
    Module.new do
      def succeed(data = {})
        channel.broadcast_to(__broadcast_target, data.merge(event: succeed_with))
      end

      def fail(data = {})
        channel.broadcast_to(__broadcast_target, data.merge(event: fail_with))
      end

      def __broadcast_target
        if broadcast_to.respond_to?(:call)
          instance_eval(&broadcast_to)
        elsif broadcast_to.respond_to?(:to_sym)
          send(broadcast_to.to_sym)
        else
          raise "No way to retrieve the broadcast target from #{broadcast_to}"
        end
      end
    end
  end
end
