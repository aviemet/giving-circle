class CreateTemplates < ActiveRecord::Migration[8.0]
  def change
    create_table :templates, id: :uuid do |t|
      t.references :circle, null: false, foreign_key: true, type: :uuid
      t.string :name
      t.string :slug, index: { unique: true }
      t.jsonb :settings, null: false, default: {}
      t.integer :version, null: false, default: 0 # Increment upon save for tracking changes

      t.timestamps
    end
  end
end
