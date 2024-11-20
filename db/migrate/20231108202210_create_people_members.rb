class CreatePeopleMembers < ActiveRecord::Migration[7.2]
  def change
    create_table :people_members, id: :uuid do |t|
      t.references :person, null: false, foreign_key: true, type: :uuid
      t.references :member, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
