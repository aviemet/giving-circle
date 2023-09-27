class AddFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :active_circle, foreign_key: { to_table: :circles }
  end
end
