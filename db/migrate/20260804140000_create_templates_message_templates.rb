class CreateTemplatesMessageTemplates < ActiveRecord::Migration[8.1]
  def change
    create_table :templates_message_templates, id: :uuid do |t|
      t.references :template, null: false, foreign_key: true, type: :uuid
      t.references :message_template, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end

    add_index :templates_message_templates,
      [:template_id, :message_template_id],
      unique: true,
      name: "index_templates_message_templates_uniqueness"
  end
end
