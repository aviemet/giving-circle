class CreatePhones < ActiveRecord::Migration[7.0]
  def change
    create_table :phones, id: :uuid do |t|
      t.string :number

      t.references :category, type: :uuid, null: false, foreign_key: true
      t.references :contact, type: :uuid, null: false, foreign_key: true

      t.timestamps
    end
  end
end
