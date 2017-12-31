class CreateBoards < ActiveRecord::Migration[5.1]
  def change
    create_table :boards do |t|
      t.integer :pack_id

      t.timestamps
    end
  end
end
