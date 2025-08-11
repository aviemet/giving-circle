class CreatePresentationsMemberships < ActiveRecord::Migration[7.0]
  def change
    create_table :presentations_memberships, id: :uuid do |t|
      t.references :presentation, type: :uuid, null: false, foreign_key: true
      t.references :membership, type: :uuid, null: false, foreign_key: true
      t.monetize :funds, amount: { null: true, default: nil }

      t.timestamps
    end
  end
end
