class CreatePresentationsOrgs < ActiveRecord::Migration[7.0]
  def change
    create_table :presentations_orgs do |t|
      t.references :presentation, null: false, foreign_key: true
      t.references :org, null: false, foreign_key: true

      t.timestamps
    end
  end
end
