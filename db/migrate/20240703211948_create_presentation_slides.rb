class CreatePresentationSlides < ActiveRecord::Migration[7.1]
  def change
    create_table :presentation_slides do |t|
      t.string :title
      t.text :content
      t.integer :order

      t.references :presentation, null: true, foreign_key: true
      t.references :presentation_template, null: true, foreign_key: true

      t.timestamps
    end
  end
end
