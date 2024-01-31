class CreateThemesOrgs < ActiveRecord::Migration[7.0]
  def change
    create_table :themes_orgs do |t|
      t.references :org, null: false, foreign_key: true
      t.references :theme, null: false, foreign_key: true

      t.timestamps
    end
  end
end
