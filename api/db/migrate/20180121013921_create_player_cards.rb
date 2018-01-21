class CreatePlayerCards < ActiveRecord::Migration[5.1]
  def change
    create_table :player_cards do |t|
      t.integer :card_id
      t.integer :player_id
      t.integer :played_index

      t.timestamps
    end
  end
end
