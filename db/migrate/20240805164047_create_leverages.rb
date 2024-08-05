class CreateLeverages < ActiveRecord::Migration[7.1]
  def change
    create_table :leverages, id: :uuid do |t|
      t.string :name
      t.integer :type

      t.timestamps
    end
  end
end
