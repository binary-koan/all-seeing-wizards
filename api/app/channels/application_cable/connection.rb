module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :message_client

    def connect
      self.message_client = find_message_client
    end

    def disconnect
      p "NOTIFYING DISCONNECTED"
      NotifyDisconnected.new(message_client).call if message_client.is_a?(Player)
    end

    private

    def find_message_client
      find_host || find_player || reject_unauthorized_connection
    end

    def find_host
      Host.find_by(id: request.params[:host_id])
    end

    def find_player
      Player.find_by(id: request.params[:player_id])
    end
  end
end