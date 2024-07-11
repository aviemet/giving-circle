class CreateThemesOrgs < ActiveRecord::Migration[7.0]
  def change
    create_table :themes_orgs, id: :uuid do |t|
      t.references :org, type: :uuid, null: false, foreign_key: true
      t.references :theme, type: :uuid, null: false, foreign_key: true

      t.monetize :ask, amount: { null: true, default: nil }

      t.timestamps
    end
  end
end
