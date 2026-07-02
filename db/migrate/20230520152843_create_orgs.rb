class CreateOrgs < ActiveRecord::Migration[7.0]
  def change
    create_table :orgs, id: :uuid do |t|
      t.references :circle, null: false, foreign_key: true, type: :uuid
      t.string :name, null: false
      t.string :description

      t.string :slug, index: { unique: true }

      t.timestamps
    end
  end
end
