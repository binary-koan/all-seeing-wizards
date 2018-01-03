class CreatePlayers < ActiveRecord::Migration[5.1]
  def change
    create_table :players do |t|
      t.integer :game_id
      t.integer :character_id
      t.integer :x
      t.integer :y
      t.text :rotation

      t.timestamps
    end
  end
end
