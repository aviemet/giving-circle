class CreateOrgs < ActiveRecord::Migration[7.0]
  def change
    create_table :orgs do |t|
      t.string :name
      t.string :slug
      t.string :description

      t.timestamps
    end
  end
end
