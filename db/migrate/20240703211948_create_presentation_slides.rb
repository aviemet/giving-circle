class CreatePresentationSlides < ActiveRecord::Migration[7.1]
  def change
    create_table :presentation_slides, id: :uuid do |t|
      t.string :name
      t.text :content
      t.integer :order

      t.references :presentation, type: :uuid, null: true, foreign_key: true
      t.references :presentation_template, type: :uuid, null: true, foreign_key: true

      t.string :slug, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
