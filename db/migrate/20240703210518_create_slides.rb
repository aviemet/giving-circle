class CreateSlides < ActiveRecord::Migration[8.0]
  def change
    create_table :slides, id: :uuid do |t|
      t.string :title
      t.jsonb :data
      t.string :slug

      t.belongs_to :source_slide, type: :uuid, null: false, foreign_key: { to_table: :slides }

      t.timestamps
    end
  end
end
