class CreatePresentationTemplates < ActiveRecord::Migration[7.1]
  def change
    create_table :presentation_templates do |t|
      t.string :name

      t.timestamps
    end
  end
end
