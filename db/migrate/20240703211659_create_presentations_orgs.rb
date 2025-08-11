class CreatePresentationsOrgs < ActiveRecord::Migration[7.0]
  def change
    create_table :presentations_orgs, id: :uuid do |t|
      t.references :presentation, type: :uuid, null: false, foreign_key: true
      t.references :org, type: :uuid, null: false, foreign_key: true

      t.timestamps
    end

    add_index :presentations_orgs, :presentation_id
  end
end
