class CreateThemes < ActiveRecord::Migration[7.0]
  def change
    create_table :themes do |t|
      t.string :title
      t.string :question
      t.string :quarter
      t.string :slug, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
