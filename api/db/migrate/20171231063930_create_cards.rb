class CreateCards < ActiveRecord::Migration[5.1]
  def change
    create_table :cards do |t|
      t.integer :pack_id
      t.text :name
      t.text :tagline
      t.integer :effect_id
      t.integer :amount
      t.text :rotation
      t.integer :damage
      t.integer :knockback
      t.string :duration_type
      t.integer :duration

      t.timestamps
    end
  end
end
