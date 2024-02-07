class CreateThemesMembers < ActiveRecord::Migration[7.1]
  def change
    create_table :themes_members do |t|
      t.references :theme, null: false, foreign_key: true
      t.references :member, null: false, foreign_key: { to_table: :people }

      t.timestamps
    end
  end
end
