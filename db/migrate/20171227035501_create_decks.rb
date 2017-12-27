ROM::SQL.migration do
  change do
    create_table(:decks) do
      primary_key :id
      String :name, null: false
      String :description
    end
  end
end
