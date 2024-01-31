class AddFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column    :users, :active, :boolean, default: true
    # add_reference :users, :active_circle, null: true, foreign_key: { to_table: :circles }
    add_column    :users, :table_preferences, :jsonb, default: {}
    add_index     :users, :table_preferences, using: :gin
    add_column    :users, :user_preferences, :jsonb, default: {}
    add_index     :users, :user_preferences, using: :gin
  end
end
