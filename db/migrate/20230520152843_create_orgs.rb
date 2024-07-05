class CreateOrgs < ActiveRecord::Migration[7.0]
  def change
    create_table :orgs, id: :uuid do |t|
      t.string :name
      t.string :description

      t.references :circle, type: :uuid, null: false, foreign_key: true

      t.string :slug, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
