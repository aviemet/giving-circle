class CreateOrgs < ActiveRecord::Migration[7.0]
  def change
    create_table :orgs, id: :uuid do |t|
      t.string :name, null: false
      t.string :description

      t.string :slug, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
