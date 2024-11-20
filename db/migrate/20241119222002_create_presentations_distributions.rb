class CreatePresentationsDistributions < ActiveRecord::Migration[7.2]
  def change
    create_table :presentations_distributions, id: :uuid do |t|
      t.references :presentation, null: false, foreign_key: true, type: :uuid
      t.references :presentation_distribution, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
