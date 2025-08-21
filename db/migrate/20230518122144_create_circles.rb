class CreateCircles < ActiveRecord::Migration[7.0]
  def change
    create_table :circles, id: :uuid do |t|
      t.string :name, null: false

      t.boolean :mock_data, null: false, default: false

      t.string :slug, index: { unique: true }

      t.timestamps
    end
  end
end
