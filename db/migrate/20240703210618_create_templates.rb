class CreateTemplates < ActiveRecord::Migration[8.0]
  def change
    create_table :templates, id: :uuid do |t|
      t.string :name
      t.string :slug, null: false, index: { unique: true }
      t.jsonb :settings, null: false, default: {}

      t.timestamps
    end
  end
end
