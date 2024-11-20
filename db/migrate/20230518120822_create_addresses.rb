class CreateAddresses < ActiveRecord::Migration[7.0]
  def change
    create_table :addresses, id: :uuid do |t|
      t.string :address
      t.string :address_2
      t.string :city
      t.string :region
      t.string :country
      t.string :postal

      t.references :contact, type: :uuid, null: false, foreign_key: true

      t.timestamps
    end
  end
end
