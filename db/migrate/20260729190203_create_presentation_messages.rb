class CreatePresentationMessages < ActiveRecord::Migration[8.1]
  def change
    create_table :presentation_messages, id: :uuid do |t|
      t.references :presentation, null: false, foreign_key: true, type: :uuid
      t.references :message_template, null: true, foreign_key: true, type: :uuid
      t.references :integration, null: true, foreign_key: true, type: :uuid
      t.references :skip_interaction, null: true, type: :uuid,
        foreign_key: { to_table: :presentation_interactions }
      t.string :name, null: false
      t.string :slug, null: false
      t.string :medium, null: false
      t.string :subject
      t.text :body, null: false, default: ""
      t.string :status, null: false, default: "ready"
      t.jsonb :delivery_results, null: false, default: {}

      t.timestamps
    end

    add_index :presentation_messages, [:presentation_id, :slug], unique: true
  end
end
