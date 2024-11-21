class CreateMemberships < ActiveRecord::Migration[7.2]
  def change
    create_table :memberships, id: :uuid do |t|
      t.string :name
      t.string :number
      t.monetize :funds, amount: { null: false, default: 0 }
      t.boolean :active, null: false, default: true

      t.string :slug, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
