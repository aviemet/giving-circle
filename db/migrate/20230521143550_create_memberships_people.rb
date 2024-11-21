class CreateMembershipsPeople < ActiveRecord::Migration[7.2]
  def change
    create_table :memberships_people, id: :uuid do |t|
      t.references :membership, null: false, foreign_key: true, type: :uuid
      t.references :person, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
