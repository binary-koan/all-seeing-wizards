class AddAmountToModifiers < ActiveRecord::Migration[5.1]
  def change
    add_column :modifiers, :amount, :integer
  end
end
