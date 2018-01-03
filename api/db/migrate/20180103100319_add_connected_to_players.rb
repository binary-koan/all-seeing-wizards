class AddConnectedToPlayers < ActiveRecord::Migration[5.1]
  def change
    add_column :players, :connected_at, :datetime
    add_column :players, :disconnected_at, :datetime
  end
end
