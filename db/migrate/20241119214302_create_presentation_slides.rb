class CreatePresentationSlides < ActiveRecord::Migration[7.2]
  def change
    create_table :presentation_slides, id: :uuid do |t|
      t.string :name, null: false
      t.jsonb :data, default: {}
      t.integer :order
      t.boolean :template, default: false, null: false

      t.timestamps
    end
  end
end