class CreatePeople < ActiveRecord::Migration[7.1]
  def change
    create_table :people do |t|
      t.string :first_name
      t.string :last_name
      t.string :middle_name
      t.string :number
      t.boolean :active, null: false, default: true

      t.timestamps
    end
  end
end
