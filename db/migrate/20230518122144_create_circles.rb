class CreateCircles < ActiveRecord::Migration[7.0]
  def change
    create_table :circles, id: :uuid do |t|
      t.string :name, null: false

      t.string :slug, index: { unique: true }

      t.timestamps
    end
  end
end
