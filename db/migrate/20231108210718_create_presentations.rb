class CreatePresentations < ActiveRecord::Migration[7.0]
  def change
    create_table :presentations do |t|
      t.references :theme, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
