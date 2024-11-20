class CreateThemes < ActiveRecord::Migration[7.0]
  def change
    create_table :themes, id: :uuid do |t|
      t.string :name
      t.datetime :published_at
      t.integer :status, default: 0

      t.string :slug, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
