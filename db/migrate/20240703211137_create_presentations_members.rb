class CreatePresentationsMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :presentations_members, id: :uuid do |t|
      t.references :presentation, type: :uuid, null: false, foreign_key: true
      t.references :member, type: :uuid, null: false, foreign_key: { to_table: :people }

      t.timestamps
    end
  end
end
