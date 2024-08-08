class CreateThemesMembers < ActiveRecord::Migration[7.1]
  def change
    create_table :themes_members, id: :uuid do |t|
      t.references :theme, type: :uuid, null: false, foreign_key: true
      t.references :member, type: :uuid, null: false, foreign_key: { to_table: :people }
      t.monetize :funds, amount: { null: true, default: nil }

      t.timestamps
    end
  end
end
