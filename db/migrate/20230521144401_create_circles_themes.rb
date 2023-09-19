class CreateCirclesThemes < ActiveRecord::Migration[7.0]
  def change
    create_table :circles_themes do |t|
      t.references :circle, null: false, foreign_key: true
      t.references :theme, null: false, foreign_key: true

      t.timestamps
    end
  end
end
