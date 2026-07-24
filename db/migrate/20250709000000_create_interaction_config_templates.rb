class CreateInteractionConfigTemplates < ActiveRecord::Migration[8.0]
  def change
    create_table :interaction_config_templates, id: :uuid do |t|
      t.references :circle, null: false, foreign_key: true, type: :uuid
      t.references :interaction_ui_template, null: true, foreign_key: true, type: :uuid
      t.string :name, null: false
      t.string :slug, null: false
      t.jsonb :config, null: false, default: {}

      t.timestamps
    end

    add_index :interaction_config_templates, [:circle_id, :slug], unique: true
  end
end
