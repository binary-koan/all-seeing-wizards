class CreateHosts < ActiveRecord::Migration[5.1]
  def change
    create_table :hosts do |t|
      t.integer :game_id

      t.timestamps
    end
  end
end
