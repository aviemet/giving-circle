class CreateCirclesMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :circles_members, id: :uuid do |t|
      t.references :circle, type: :uuid, null: false, foreign_key: true
      t.references :member, type: :uuid, null: false, foreign_key: true

      t.timestamps
    end
  end
end
