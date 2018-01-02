module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :message_client

    def connect
      self.message_client = find_message_client
    end

    private

    def find_message_client
      find_host || find_player || reject_unauthorized_connection
    end

    def find_host
      Host.find_by(id: request.headers["X-Host-Id"])
    end

    def find_player
      Player.find_by(id: request.headers["X-Player-Id"])
    end
  end
end
