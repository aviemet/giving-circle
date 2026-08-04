class CreateIntegrations < ActiveRecord::Migration[8.1]
  def change
    create_table :integrations, id: :uuid do |t|
      t.references :circle, null: false, foreign_key: true, type: :uuid
      t.string :name, null: false
      t.string :provider, null: false
      t.string :medium, null: false
      t.text :credentials, null: false, default: "{}"
      t.boolean :active, null: false, default: true

      t.timestamps
    end

    add_index :integrations, [:circle_id, :provider]
    add_index :integrations, [:circle_id, :medium]
  end
end
