class CreateGroups < ActiveRecord::Migration[7.1]
  def change
    create_table :groups, id: :uuid do |t|
      t.string :name, null: false

      t.references :circle, type: :uuid, null: false, foreign_key: true

      t.string :slug, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
