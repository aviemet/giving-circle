class AddFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    change_table :users, bulk: true do |t|
      t.boolean :active, default: true, null: false

      t.references :person, type: :uuid, null: true, foreign_key: true

      t.jsonb :table_preferences, default: {}
      t.index :table_preferences, using: :gin

      t.jsonb :user_preferences, default: {}
      t.index :user_preferences, using: :gin
    end
  end
end
