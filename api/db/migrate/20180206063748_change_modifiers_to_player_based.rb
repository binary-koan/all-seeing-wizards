class ChangeModifiersToPlayerBased < ActiveRecord::Migration[5.1]
  def change
    remove_column :modifiers, :attached_to_type, :text
    remove_column :modifiers, :attached_to_id, :integer
    add_column :modifiers, :player_id, :integer
  end
end
