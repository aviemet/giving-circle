class CreateThemesOrgs < ActiveRecord::Migration[7.0]
  def change
    create_table :themes_orgs, id: :uuid do |t|
      t.references :org, type: :uuid, null: false, foreign_key: true
      t.references :theme, type: :uuid, null: false, foreign_key: true

      t.monetize :ask, amount: { null: true, default: nil }

      t.timestamps

      t.index [:theme_id, :org_id], unique: true, name: 'index_themes_orgs_on_theme_id_and_org_id'
    end
  end
end
