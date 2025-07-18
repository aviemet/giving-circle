class CreateOwnerships < ActiveRecord::Migration[7.2]
  def change
    create_table :ownerships, id: :uuid do |t|
      t.references :circle, null: false, foreign_key: true, type: :uuid
      t.references :ownable, polymorphic: true, null: false, type: :uuid

      t.timestamps
    end
  end
end
