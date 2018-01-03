class CreateBoardObjects < ActiveRecord::Migration[5.1]
  def change
    create_table :board_objects do |t|
      t.integer :board_id
      t.integer :x
      t.integer :y
      t.integer :type_id

      t.timestamps
    end
  end
end
