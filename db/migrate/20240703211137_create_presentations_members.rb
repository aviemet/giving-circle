class CreatePresentationsMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :presentations_members do |t|
      t.references :presentation, null: false, foreign_key: true
      t.references :member, null: false, foreign_key: { to_table: :people }

      t.timestamps
    end
  end
end
