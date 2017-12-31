class CreateGameBoards < ActiveRecord::Migration[5.1]
  def change
    create_table :game_boards do |t|
      t.integer :game_id
      t.integer :board_id
      t.text :rotation
      t.integer :index

      t.timestamps
    end
  end
end
