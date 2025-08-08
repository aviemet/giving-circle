class CreateSlideParents < ActiveRecord::Migration[8.0]
  def change
    create_table :slide_parents, id: :uuid do |t|
      t.references :slide, null: false, foreign_key: true, type: :uuid
      t.references :parentable, polymorphic: true, null: false, type: :uuid
      t.integer :order

      t.timestamps
    end
  end
end
