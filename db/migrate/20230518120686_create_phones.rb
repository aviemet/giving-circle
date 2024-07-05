class CreatePhones < ActiveRecord::Migration[7.0]
  def change
    create_table :phones, id: :uuid do |t|
      t.string :number

      t.references :contact, type: :uuid

      t.timestamps
    end
  end
end
