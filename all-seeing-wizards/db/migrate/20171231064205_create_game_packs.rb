class CreateGamePacks < ActiveRecord::Migration[5.1]
  def change
    create_table :game_packs do |t|
      t.integer :game_id
      t.integer :pack_id

      t.timestamps
    end
  end
end
