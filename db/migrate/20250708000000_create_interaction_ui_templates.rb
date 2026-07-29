class CreateInteractionUiTemplates < ActiveRecord::Migration[8.0]
  def change
    create_table :interaction_ui_templates, id: :uuid do |t|
      t.string :name, null: false
      t.string :slug, null: false

      t.timestamps
    end

    add_index :interaction_ui_templates, :slug, unique: true
  end
end
