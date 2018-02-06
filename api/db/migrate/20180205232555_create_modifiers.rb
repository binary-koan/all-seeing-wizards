class CreateModifiers < ActiveRecord::Migration[5.1]
  def change
    create_table :modifiers do |t|
      t.text :modifier_type
      t.text :duration_type
      t.integer :duration
      t.text :attached_to_type
      t.integer :attached_to_id

      t.timestamps
    end
  end
end
