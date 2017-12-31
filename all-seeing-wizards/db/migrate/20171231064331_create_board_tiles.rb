class CreateBoardTiles < ActiveRecord::Migration[5.1]
  def change
    create_table :board_tiles do |t|
      t.integer :board_id
      t.integer :index
      t.integer :type_id

      t.timestamps
    end
  end
end
