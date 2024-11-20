class CreatePresentationsSlides < ActiveRecord::Migration[7.2]
  def change
    create_table :presentations_slides, id: :uuid do |t|
      t.references :presentation, null: false, foreign_key: true, type: :uuid
      t.references :presentation_slide, null: false, foreign_key: true, type: :uuid

      t.string :instance_name

      t.timestamps
    end
  end
end
