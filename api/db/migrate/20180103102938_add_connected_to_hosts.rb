class AddConnectedToHosts < ActiveRecord::Migration[5.1]
  def change
    add_column :hosts, :connected_at, :datetime
    add_column :hosts, :disconnected_at, :datetime
  end
end
