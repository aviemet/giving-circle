class CreatePresentationElements < ActiveRecord::Migration[7.2]
  def change
    create_table :presentation_elements, id: :uuid do |t|
      t.string :name, null: false
      t.jsonb :data, default: {}
      t.boolean :template, default: false, null: false

      t.timestamps
    end
  end
end
