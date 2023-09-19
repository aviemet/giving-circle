class CreateMembersThemes < ActiveRecord::Migration[7.0]
  def change
    create_table :members_themes do |t|
      t.references :member, null: false, foreign_key: true
      t.references :theme, null: false, foreign_key: true

      t.timestamps
    end
  end
end
