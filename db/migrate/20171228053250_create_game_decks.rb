ROM::SQL.migration do
  change do
    create_table(:game_decks) do
      foreign_key :game_id, null: false
      foreign_key :deck_id, null: false
      primary_key [:game_id, :deck_id]
    end
  end
end
