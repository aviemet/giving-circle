class CreatePresentationTemplates < ActiveRecord::Migration[7.1]
  def change
    create_table :presentation_templates, id: :uuid do |t|
      t.string :name

      t.string :slug, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
