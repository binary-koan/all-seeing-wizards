ROM::SQL.migration do
  change do
    create_table(:cards) do
      primary_key :id
      foreign_key :deck_id, :decks, null: false
      text :name, null: false
      text :tagline

      varchar :effect, size: 50, null: false

      # Different effects will use different combinations of these values
      integer :amount
      integer :rotation
      integer :damage
      integer :knockback
      varchar :duration_type, size: 50
      integer :duration
    end

    create_table(:card_ranges) do
      primary_key :id
      foreign_key :card_id, :cards, null: false

      varchar :type, size: 50, null: false
      varchar :position, size: 50
      integer :size
    end
  end
end
