class CreateThemes < ActiveRecord::Migration[7.0]
  def change
    create_table :themes do |t|
      t.string :title
      t.string :slug, null: false, index: { unique: true }
      t.datetime :published_at
      t.integer :status, default: 0
      t.references :circle, null: false, foreign_key: true

      t.timestamps
    end
  end
end
