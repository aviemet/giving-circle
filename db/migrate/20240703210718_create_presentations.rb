class CreatePresentations < ActiveRecord::Migration[7.1]
  def change
    create_table :presentations, id: :uuid do |t|
      t.string :name, null: false
      t.boolean :active, null: false, default: false
      t.jsonb :slides, default: {}
      t.jsonb :settings, default: {}

      t.references :theme, type: :uuid, null: false, foreign_key: true
      t.references :template, type: :uuid, null: true, foreign_key: true

      t.string :slug, null: false, index: { unique: true }

      t.timestamps
    end

    add_index :presentations, [:theme_id, :created_at]
  end
end
