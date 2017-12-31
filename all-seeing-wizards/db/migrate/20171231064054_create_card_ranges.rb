class CreateCardRanges < ActiveRecord::Migration[5.1]
  def change
    create_table :card_ranges do |t|
      t.integer :card_id
      t.integer :type_id
      t.text :position
      t.integer :size

      t.timestamps
    end
  end
end
