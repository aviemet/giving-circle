class CreatePresentationInteractions < ActiveRecord::Migration[8.0]
  def change
    create_table :presentation_interactions, id: :uuid do |t|
      t.references :presentation, null: false, foreign_key: true, type: :uuid
      t.string :slug, null: false
      t.string :name, null: false
      t.jsonb :config, null: false, default: {}
      t.jsonb :results, null: false, default: {}
      t.integer :trigger_type, null: false, default: 0
      t.jsonb :trigger_conditions, null: false, default: {}
      t.boolean :accepting_responses, null: false, default: false

      t.timestamps
    end

    add_index :presentation_interactions, [:presentation_id, :slug], unique: true
  end
end
