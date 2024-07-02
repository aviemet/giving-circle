class CreatePresentations < ActiveRecord::Migration[7.1]
  def change
    create_table :presentations do |t|
      t.string :name
      t.references :theme, null: false, foreign_key: true
      t.references :presentation_template, null: true, foreign_key: true

      t.timestamps
    end
  end
end
