class CreatePeople < ActiveRecord::Migration[7.1]
  def change
    create_table :people, id: :uuid do |t|
      t.string :first_name
      t.string :last_name
      t.string :middle_name
      t.boolean :active, null: false, default: true

      t.string :slug, index: { unique: true }

      t.timestamps
    end
  end
end
