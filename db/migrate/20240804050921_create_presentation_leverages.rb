class CreatePresentationLeverages < ActiveRecord::Migration[7.1]
  def change
    create_table :presentation_leverages, id: :uuid do |t|
      t.string :name
      t.integer :type

      t.timestamps
    end
  end
end
