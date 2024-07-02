class CreatePresentationElements < ActiveRecord::Migration[7.1]
  def change
    create_table :presentation_elements do |t|
      t.string :title
      t.jsonb :data
      t.integer :element

      t.timestamps
    end
  end
end
