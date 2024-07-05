class CreatePresentationElements < ActiveRecord::Migration[7.1]
  def change
    create_table :presentation_elements, id: :uuid do |t|
      t.string :name
      t.jsonb :data
      t.integer :element

      t.timestamps
    end
  end
end
