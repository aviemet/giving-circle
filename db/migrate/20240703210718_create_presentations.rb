class CreatePresentations < ActiveRecord::Migration[7.1]
  def change
    create_table :presentations, id: :uuid do |t|
      t.string :name, null: false
      t.jsonb :settings, default: {}
      t.boolean :active, null: false, default: false
      t.boolean :template, null: false, default: false

      t.references :theme, type: :uuid, null: false, foreign_key: true
      t.references :presentation_template, type: :uuid, null: true, foreign_key: { to_table: :presentations }

      t.string :slug, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
