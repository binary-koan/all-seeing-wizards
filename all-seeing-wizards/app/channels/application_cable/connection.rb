module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :message_client

    def connect
      self.message_client = find_message_client
      message_client.update!(connected_at: Time.now)
    end

    def disconnect
      message_client.update!(disconnected_at: Time.now)
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
