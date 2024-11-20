class CreatePresentationDistributions < ActiveRecord::Migration[7.1]
  def change
    create_table :presentation_distributions, id: :uuid do |t|
      t.string :name, null: false
      t.integer :type
      t.boolean :template, default: false, null: false

      t.timestamps
    end
  end
end
