class AddHpToPlayers < ActiveRecord::Migration[5.1]
  def change
    add_column :players, :hp, :integer, default: 5
  end
end
