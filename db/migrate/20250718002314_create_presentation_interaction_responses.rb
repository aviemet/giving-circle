class CreatePresentationInteractionResponses < ActiveRecord::Migration[8.0]
  def change
    create_table :presentation_interaction_responses, id: :uuid do |t|
      t.references :presentation_interaction, null: false, foreign_key: true, type: :uuid
      t.references :membership, null: false, foreign_key: true, type: :uuid
      t.jsonb :response_data

      t.timestamps
    end
  end
end
