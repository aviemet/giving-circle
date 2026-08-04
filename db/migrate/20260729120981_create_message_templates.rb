class CreateMessageTemplates < ActiveRecord::Migration[8.1]
  def change
    create_table :message_templates, id: :uuid do |t|
      t.references :circle, null: false, foreign_key: true, type: :uuid
      t.string :name, null: false
      t.string :slug, null: false
      t.string :medium, null: false
      t.string :subject
      t.text :body, null: false, default: ""

      t.timestamps
    end

    add_index :message_templates, [:circle_id, :slug], unique: true
  end
end
