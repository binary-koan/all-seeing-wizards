ROM::SQL.migration do
  change do
    create_table :boards do
      primary_key :id
      foreign_key :deck_id, null: false, on_delete: :cascade
    end

    create_table :board_tiles do
      primary_key :id
      foreign_key :board_id, null: false, on_delete: :cascade
      integer :index
      integer :type_id
    end

    create_table :board_objects do
      primary_key :id
      foreign_key :board_id, null: false, on_delete: :cascade
      integer :x
      integer :y
      integer :type_id
    end

    create_table :game_boards do
      primary_key :id
      foreign_key :game_id, null: false, on_delete: :cascade
      foreign_key :board_id, null: false, on_delete: :cascade
      integer :rotation
      integer :index
    end

    create_table :game_objects do
      foreign_key :game_board_id, null: false, on_delete: :cascade
      foreign_key :board_object_id, null: false, on_delete: :cascade
      primary_key [:game_board_id, :board_object_id]
      integer :x
      integer :y
    end
  end
end
