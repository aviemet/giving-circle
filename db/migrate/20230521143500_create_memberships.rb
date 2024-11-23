class CreateMemberships < ActiveRecord::Migration[7.2]
  def change
    create_table :memberships, id: :uuid do |t|
      t.string :name, null: false
      t.string :number
      t.monetize :funds, amount: { null: false, default: 0 }
      t.boolean :active, null: false, default: true
      t.string :slug, null: false, index: { unique: true }

      t.references :person, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
