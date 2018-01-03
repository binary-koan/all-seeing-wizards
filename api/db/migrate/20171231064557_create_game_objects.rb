class CreateGameObjects < ActiveRecord::Migration[5.1]
  def change
    create_table :game_objects do |t|
      t.integer :game_id
      t.integer :board_object_id
      t.integer :x
      t.integer :y

      t.timestamps
    end
  end
end
